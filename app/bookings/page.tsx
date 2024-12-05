import type { Metadata } from 'next';

import { SITE } from '~/config.js';
import BookingList from '~/components/atoms/BookingList'
import AuthenticatedPage from '~/components/atoms/AuthenticatedPage'
import { QueryClientProvider } from '@tanstack/react-query';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/components/ui/tabs"
import PricingTable from '~/components/atoms/PricingTable';
import ManualAdjustmentTable from '~/components/atoms/ManualAdjustmentTable';
import SiteText from '~/components/atoms/SiteText';

export const metadata: Metadata = {
  title: SITE.title,
};

export default function Page({ params, searchParams }: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const isNorth = !!searchParams && !!searchParams['north']
  return (
    <>
      <AuthenticatedPage>
        <Tabs defaultValue="bookings" className="w-full min-h-[900px]">
          <div className='w-full flex items-center justify-center'>
            <TabsList className='w-full max-w-[800px] mt-4'>
              <TabsTrigger value="bookings" className='w-4/12'>Bookings</TabsTrigger>
              <TabsTrigger value="pricing" className='w-4/12'>Pricing</TabsTrigger>
              <TabsTrigger value="manualAdjustment" className='w-4/12'>Manual Adjustment</TabsTrigger>
              <TabsTrigger value="text" className='w-4/12'>Site Text</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="bookings" className=''>
            <BookingList north={isNorth} />
          </TabsContent>
          <TabsContent value="pricing">
            <PricingTable />
          </TabsContent>
          <TabsContent value="manualAdjustment">
            <ManualAdjustmentTable />
          </TabsContent>
          <TabsContent value="text">
            <SiteText />
          </TabsContent>
        </Tabs>
      </AuthenticatedPage>
    </>
  );
}
