'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { createApiKey } from '@/helpers/create-api-key';
import { revokeApiKey } from '@/helpers/revoke-api-key';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { Button } from './ui/Button';
import { toast } from './ui/toast';
import { motion, AnimatePresence } from 'framer-motion';

interface ApiKeyOptionsProps {
  // passing of entire object not allowed due to date property not being serializable
  apiKeyKey: string;
}

const ApiKeyOptions: FC<ApiKeyOptionsProps> = ({ apiKeyKey }) => {
  const router = useRouter();
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [isRevoking, setIsRevoking] = useState<boolean>(false);

  const menuItemVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  const createNewApiKey = async () => {
    setIsCreatingNew(true);
    try {
      await revokeApiKey();
      await createApiKey();
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error creating new API key',
        message: 'Please try again later.',
        type: 'error',
      });
    } finally {
      setIsCreatingNew(false);
    }
  };

  const revokeCurrentApiKey = async () => {
    setIsRevoking(true);  // 
    try {
      await revokeApiKey();
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error revoking your API key',
        message: 'Please try again later.',
        type: 'error',
      });
    } finally {
      setIsRevoking(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isCreatingNew || isRevoking} asChild>
        <Button variant='ghost' className='flex gap-2 items-center'>
          <p>
            {isCreatingNew
              ? 'Creating new key'
              : isRevoking
              ? 'Revoking key'
              : 'Options'}
          </p>
          {isCreatingNew || isRevoking ? (
            <Loader2 className='animate-spin h-4 w-4' />
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <motion.div
          variants={menuItemVariants}
          initial='hidden'
          animate='visible'
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(apiKeyKey);

              toast({
                title: 'Copied',
                message: 'API key copied to clipboard',
                type: 'success',
              });
            }}
          >
            Copy
          </DropdownMenuItem>
        </motion.div>
        <DropdownMenuSeparator />
        <motion.div
          variants={menuItemVariants}
          initial='hidden'
          animate='visible'
          transition={{ duration: 0.2, delay: 0.2 }}
        >
          <DropdownMenuItem onClick={createNewApiKey}>
            Create new key
          </DropdownMenuItem>
        </motion.div>
        <DropdownMenuSeparator />
        <motion.div
          variants={menuItemVariants}
          initial='hidden'
          animate='visible'
          transition={{ duration: 0.2, delay: 0.3 }}
        >
          <DropdownMenuItem onClick={revokeCurrentApiKey}>
            Revoke key
          </DropdownMenuItem>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ApiKeyOptions;
