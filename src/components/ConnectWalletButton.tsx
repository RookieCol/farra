import { useAccount, useDisconnect, useBalance } from 'wagmi';
import { formatEther } from 'viem';
import {
  ConnectWallet,
  Wallet,
} from '@coinbase/onchainkit/wallet';
import { Copy, LogOut, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function getInitials(address: string): string {
  return address.slice(2, 4).toUpperCase();
}

export default function ConnectWalletButton() {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address: address,
  });

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
    }
  };

  if (!isConnected) {
    return (
      <Wallet>
        <ConnectWallet>
          <span className="text-sm font-medium">Connect Wallet</span>
        </ConnectWallet>
      </Wallet>
    );
  }

  if (!address) {
    return null;
  }

  const ethBalance = balance ? parseFloat(formatEther(balance.value)).toFixed(4) : '0.0000';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "inline-flex items-center justify-center gap-2",
            "h-9 px-3 py-2",
            "rounded-md border border-gray-800 bg-transparent",
            "text-sm font-medium text-white",
            "hover:bg-gray-800/50 hover:border-gray-700",
            "transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-900",
            "disabled:pointer-events-none disabled:opacity-50"
          )}
        >
          <Avatar className="h-6 w-6">
            <AvatarFallback className="bg-gray-800 text-gray-300 text-xs">
              {getInitials(address)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm">{formatAddress(address)}</span>
          <ChevronDown className="h-3.5 w-3.5 opacity-50" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="p-2 space-y-2">
          <div className="flex items-center gap-2.5 px-2 py-1.5">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-gray-800 text-gray-300 text-xs">
                {getInitials(address)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-medium truncate">
                {formatAddress(address)}
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <code className="text-xs text-gray-500 font-mono truncate">
                  {address}
                </code>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyAddress();
                  }}
                  className="p-0.5 hover:bg-gray-800 rounded transition-colors shrink-0 opacity-60 hover:opacity-100"
                  title="Copy address"
                >
                  <Copy size={10} className="text-gray-400" />
                </button>
              </div>
            </div>
          </div>
          <DropdownMenuSeparator />
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-xs text-gray-500">Balance</span>
            <span className="text-sm font-medium">{ethBalance} ETH</span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => disconnect()}
          className="text-red-400 focus:text-red-300 focus:bg-red-950/10 cursor-pointer"
        >
          <LogOut className="mr-2 h-3.5 w-3.5" />
          <span className="text-sm">Disconnect</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
