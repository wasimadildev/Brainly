import { useState } from "react";
import { Modal } from "./Modal";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
}

export const ShareModal = ({ isOpen, onClose, shareUrl } : ShareModalProps) => {

  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Your Second Brain">
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-400">
          Share your entire collection of notes, documents, tweets, and videos with others. They'll be able to import your content into their own Second Brain.
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <button
            onClick={copyToClipboard}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          3 items will be shared
        </p>
      </div>
    </Modal>
  );
};