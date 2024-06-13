import { getSmartAccountClient } from '@/services/sponsoredTransactions.services';
import { useEffect, useState } from 'react';

type SmartAccountClient = null | Awaited<
  ReturnType<typeof getSmartAccountClient>
>;
function useSmartAccountClient() {
  const [smartAccountClient, setSmartAccountClient] =
    useState<SmartAccountClient>(null);

  useEffect(() => {
    (async () => {
      const client = await getSmartAccountClient();
      setSmartAccountClient(client);
    })();
  });

  return { smartAccountClient };
}
export default useSmartAccountClient;
