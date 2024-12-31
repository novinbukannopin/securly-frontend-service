import { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { client } from '@/lib/axios';

function PredictionResult({
  prediction,
  originalUrl,
}: {
  prediction: string | null;
  originalUrl: string;
}) {
  const [isFormVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({ reason: '', evidence: '' });
  const [currentAction, setCurrentAction] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const handlePostReview = async () => {
    try {
      const res = await client.post('/reviews', {
        reason: formData.reason,
        evidence: formData.evidence,
        action: currentAction.toUpperCase(),
        type: prediction?.toUpperCase(),
        originalUrl,
      });
      console.log('Review submitted:', res.data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success('Review submitted successfully.');
      setFormVisible(false);
    } catch (error) {
      console.error('Error posting review:', error);
      toast.error('Failed to submit review.');
    } finally {
      setSubmitting(true);
    }
  };

  const renderAlert = () => {
    if (!prediction) return null;

    switch (prediction) {
      case 'benign':
        return (
          <Alert className='mb-4 border-green-500 bg-green-50 dark:bg-green-900/10'>
            <CheckCircle className='h-4 w-4 text-green-600 dark:text-green-400' />
            <AlertTitle className='text-md text-green-600 dark:text-green-400'>
              This URL appears safe to use.
            </AlertTitle>
            <p className='text-sm text-green-600/90 dark:text-green-400/90'>
              The link has been analyzed using advanced deep learning techniques
              and shows no signs of harmful activity. You can proceed with
              confidence.
            </p>
            <Button
              type='button'
              variant='outline'
              className='mt-3 border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700'
              onClick={() => {
                if (!isFormVisible) {
                  setFormVisible(true);
                  setCurrentAction('APPROVE');
                }
              }}
              disabled={isFormVisible || isSubmitting} // Disable button when form is visible or submitting
            >
              {isSubmitting ? 'Approved' : 'Aproval'}
            </Button>
          </Alert>
        );

      case 'malicious':
        return (
          <Alert className='mb-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10'>
            <AlertTriangle className='h-4 w-4 text-yellow-600 dark:text-yellow-400' />
            <AlertTitle className='text-md text-yellow-600 dark:text-yellow-400'>
              Warning: Potentially harmful link detected.
            </AlertTitle>
            <p className='text-sm text-yellow-600/90 dark:text-yellow-400/90'>
              This URL may contain malicious content or exhibit suspicious
              behavior. It has been flagged by our deep learning model. If this
              is incorrect, you can request a review.
            </p>
            <Button
              type='button'
              variant='outline'
              className='mt-3 border-yellow-500 text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700'
              onClick={() => {
                if (!isFormVisible) {
                  setFormVisible(true);
                  setCurrentAction('REQUEST_REVIEW');
                }
              }}
              disabled={isFormVisible || isSubmitting} // Disable button when form is visible or submitting
            >
              {isSubmitting ? 'Requested' : 'Request Review'}
            </Button>
          </Alert>
        );

      case 'blocked':
        return (
          <Alert variant='destructive' className='mb-4'>
            <XCircle className='h-4 w-4 text-red-600/90' />
            <AlertTitle className='text-md text-red-600/90 dark:text-red-400/90'>
              Access to this URL has been blocked.
            </AlertTitle>
            <p className='text-sm text-red-600/90 dark:text-red-400/90'>
              The link is associated with harmful activity and has been
              restricted based on deep learning analysis. If you believe this is
              incorrect, submit a request to unblock with details.
            </p>
            <Button
              type='button'
              variant='destructive'
              className='mt-3'
              onClick={() => {
                if (!isFormVisible) {
                  setFormVisible(true);
                  setCurrentAction('REQUEST_UNBLOCK');
                }
              }}
              disabled={isFormVisible || isSubmitting} // Disable button when form is visible or submitting
            >
              {isSubmitting ? 'Submitted' : 'Submit'}
            </Button>
          </Alert>
        );

      default:
        return (
          <p className='text-sm text-gray-500'>
            No prediction available for this URL.
          </p>
        );
    }
  };

  return (
    <div className='w-full space-y-4 pt-2'>
      {renderAlert()}
      {isFormVisible && (
        <div className='mt-4 rounded border bg-gray-50 p-4 dark:bg-gray-800'>
          <h3 className='mb-2 text-lg font-semibold'>
            Provide Additional Information
          </h3>
          <div className='space-y-2'>
            <textarea
              className='w-full rounded border p-2 focus:outline-none'
              placeholder='Reason for the action...'
              onChange={(e) =>
                setFormData({ ...formData, reason: e.target.value })
              }
            />
            <textarea
              className='w-full rounded border p-2 focus:outline-none'
              placeholder='Evidence to support the action...'
              onChange={(e) =>
                setFormData({ ...formData, evidence: e.target.value })
              }
            />
          </div>
          <div className='mt-3 space-x-2'>
            <Button
              type='button'
              variant='outline'
              onClick={handlePostReview}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
            <Button
              type='button'
              variant='secondary'
              onClick={() => setFormVisible(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PredictionResult;
