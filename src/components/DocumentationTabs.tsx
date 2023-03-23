'use client';

import { FC } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/ui/Tabs';
import Code from '@/components/ui/Code';
import { nodejs, python } from '@/helpers/documentation-code';
import SimpleBar from 'simplebar-react';

const DocumentationTabs: FC = () => {
  return (
    <Tabs defaultValue='nodejs' className='max-w-2xl w-full'>
      <TabsList>
        <TabsTrigger value='nodejs'>NodeJS</TabsTrigger>
        <TabsTrigger value='python'>Python</TabsTrigger>
        <TabsContent value='nodejs'>
          <Code animated language='javascript' code={nodejs} show />
        </TabsContent>

        <TabsContent value='python'>
          <Code animated language='python' code={python} show />
        </TabsContent>
      </TabsList>
    </Tabs>
  );
};

export default DocumentationTabs;
