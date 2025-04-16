export const dynamic = 'force-dynamic';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { getWalletData } from '@/lib/server/walletData';


export default async function WalletPage() {
  const walletData = await getWalletData();
  return (
    <section className="w-full max-w-7xl lg:p-4 mx-auto max-lg:p-2">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold max-sm:text-2xl">Wallet</h1>
          <p className="text-muted-foreground mt-2">Your Earnings</p>
        </div>
      </div>
      <Separator className="my-4" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Balance</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-green-600">
            ₹ {walletData.balance}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Locked Balance</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-yellow-500">
            ₹ {walletData.locked_balance}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Transaction History</h2>
        <ScrollArea className="h-[300px] w-full rounded-md border p-2">
          <ul className="space-y-4">
            {walletData.transactions.map((txn) => (
              <li key={txn.transaction_no} className="border p-4 rounded-md shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-base">₹ {txn.amount}</h3>
                    <p className="text-muted-foreground text-sm">{txn.description}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge variant="outline">{txn.status}</Badge>
                    <span className="text-xs text-gray-500 mt-1">
                      {format(new Date(txn.created_at), 'PPPpp')}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
    </section>
  );
};


