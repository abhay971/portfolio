import { motion } from 'framer-motion';
import { useState } from 'react';

interface Submission {
  id: number;
  name: string;
  email: string;
  message: string;
  submittedAt: string;
  isRead: boolean;
  isArchived: boolean;
  readAt?: string;
  notes?: string;
}

interface SubmissionsListProps {
  submissions: Submission[];
  onUpdate: (id: number, updates: { isRead?: boolean; isArchived?: boolean }) => Promise<void>;
}

export default function SubmissionsList({ submissions, onUpdate }: SubmissionsListProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (submissions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg" style={{ fontFamily: "'Inter', sans-serif" }}>
          No submissions yet
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {submissions.map((submission) => (
        <motion.div
          key={submission.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`border-2 ${
            submission.isArchived
              ? 'border-gray-700 bg-gray-900/50'
              : submission.isRead
              ? 'border-lime-400/20'
              : 'border-lime-400/50'
          } p-6 transition-all duration-300 hover:border-lime-400`}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em' }}
                >
                  {submission.name}
                </h3>
                {!submission.isRead && !submission.isArchived && (
                  <span className="px-2 py-1 bg-lime-400 text-black text-xs font-bold uppercase">
                    NEW
                  </span>
                )}
                {submission.isArchived && (
                  <span className="px-2 py-1 bg-gray-600 text-white text-xs font-bold uppercase">
                    Archived
                  </span>
                )}
              </div>
              <a
                href={`mailto:${submission.email}`}
                className="text-lime-400 hover:text-lime-300 transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {submission.email}
              </a>
              <p className="text-gray-500 text-sm mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                {formatDate(submission.submittedAt)}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {!submission.isRead && (
                <button
                  onClick={() => onUpdate(submission.id, { isRead: true })}
                  className="px-3 py-1 bg-lime-400/10 border border-lime-400 text-lime-400 text-xs font-bold uppercase hover:bg-lime-400 hover:text-black transition-all duration-300"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Mark Read
                </button>
              )}
              <button
                onClick={() =>
                  onUpdate(submission.id, {
                    isArchived: !submission.isArchived,
                  })
                }
                className={`px-3 py-1 border text-xs font-bold uppercase transition-all duration-300 ${
                  submission.isArchived
                    ? 'bg-lime-400/10 border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-black'
                    : 'bg-gray-600/10 border-gray-600 text-gray-400 hover:bg-gray-600 hover:text-white'
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {submission.isArchived ? 'Unarchive' : 'Archive'}
              </button>
              <button
                onClick={() =>
                  setExpandedId(expandedId === submission.id ? null : submission.id)
                }
                className="px-3 py-1 bg-transparent border border-white/20 text-white text-xs font-bold uppercase hover:border-lime-400 hover:text-lime-400 transition-all duration-300"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {expandedId === submission.id ? 'Hide' : 'View'}
              </button>
            </div>
          </div>

          {/* Expanded Message */}
          {expandedId === submission.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t-2 border-lime-400/20 pt-4 mt-4"
            >
              <h4
                className="text-sm uppercase text-lime-400 mb-2 font-bold"
                style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.1em' }}
              >
                Message
              </h4>
              <p
                className="text-gray-300 whitespace-pre-wrap mb-4"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {submission.message}
              </p>

              {submission.notes && (
                <>
                  <h4
                    className="text-sm uppercase text-lime-400 mb-2 font-bold"
                    style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.1em' }}
                  >
                    Notes
                  </h4>
                  <p
                    className="text-gray-400 text-sm"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {submission.notes}
                  </p>
                </>
              )}

              {/* Quick Reply Button */}
              <div className="mt-4">
                <a
                  href={`mailto:${submission.email}?subject=Re: Contact Form Submission&body=Hi ${submission.name},%0D%0A%0D%0A`}
                  className="inline-block px-4 py-2 bg-lime-400 text-black font-bold uppercase hover:bg-lime-300 transition-all duration-300"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em' }}
                >
                  Reply via Email
                </a>
              </div>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
