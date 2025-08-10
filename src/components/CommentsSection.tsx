'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, MessageCircle, Send } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  updateDoc, 
  doc, 
  arrayUnion, 
  arrayRemove,
  increment
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  content: string;
  timestamp: any;
  likes: string[];
  likesCount: number;
}

export default function CommentsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  const { currentUser } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'comments'), orderBy('timestamp', 'desc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const commentsData: Comment[] = [];
      querySnapshot.forEach((doc) => {
        commentsData.push({
          id: doc.id,
          ...doc.data()
        } as Comment);
      });
      setComments(commentsData);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !newComment.trim()) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'comments'), {
        userId: currentUser.uid,
        userName: currentUser.displayName || currentUser.email?.split('@')[0] || 'Anonymous',
        userEmail: currentUser.email,
        content: newComment.trim(),
        timestamp: new Date(),
        likes: [],
        likesCount: 0
      });
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
    setLoading(false);
  };

  const handleLike = async (commentId: string, currentLikes: string[]) => {
    if (!currentUser) return;

    const commentRef = doc(db, 'comments', commentId);
    const hasLiked = currentLikes.includes(currentUser.uid);

    try {
      if (hasLiked) {
        await updateDoc(commentRef, {
          likes: arrayRemove(currentUser.uid),
          likesCount: increment(-1)
        });
      } else {
        await updateDoc(commentRef, {
          likes: arrayUnion(currentUser.uid),
          likesCount: increment(1)
        });
      }
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto border-t border-white/10">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Comments</h2>
        <p className="text-gray-400">Share your thoughts and connect with the community</p>
      </motion.div>

      {/* Comment Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-12"
      >
        {currentUser ? (
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                <MessageCircle size={20} className="text-orange-500" />
              </div>
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full bg-white/5 border border-white/20 rounded-lg p-4 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none resize-none"
                  rows={3}
                />
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-gray-400">
                    Posting as {currentUser.displayName || currentUser.email}
                  </span>
                  <button
                    type="submit"
                    disabled={loading || !newComment.trim()}
                    className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg transition-colors"
                  >
                    <Send size={16} />
                    {loading ? 'Posting...' : 'Post'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="text-center p-8 bg-white/5 rounded-lg border border-white/10">
            <MessageCircle size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">Sign in to join the conversation</p>
            <a
              href="/auth/login"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-lg transition-colors"
            >
              Sign In to Comment
            </a>
          </div>
        )}
      </motion.div>

      {/* Comments List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="space-y-6"
      >
        {comments.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 rounded-lg p-6 border border-white/10"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-white">{comment.userName}</h4>
                  <p className="text-sm text-gray-400">
                    {comment.timestamp?.toDate?.()?.toLocaleDateString() || 'Just now'}
                  </p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4 leading-relaxed">{comment.content}</p>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLike(comment.id, comment.likes)}
                  disabled={!currentUser}
                  className={`flex items-center gap-2 transition-colors ${
                    currentUser && comment.likes.includes(currentUser.uid)
                      ? 'text-red-500'
                      : 'text-gray-400 hover:text-red-500'
                  } disabled:cursor-not-allowed`}
                >
                  <Heart 
                    size={16} 
                    className={currentUser && comment.likes.includes(currentUser.uid) ? 'fill-current' : ''} 
                  />
                  <span className="text-sm">{comment.likesCount}</span>
                </button>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </section>
  );
}