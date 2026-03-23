<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CMI Mock Gateway</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-900 text-white min-h-screen flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl">
        <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-orange-500/10 rounded-full mb-4">
                <svg class="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
            </div>
            <h1 class="text-2xl font-bold">CMI Test Gateway</h1>
            <p class="text-slate-400 text-sm mt-2">Simulation for Order #{{ $params['oid'] ?? '???' }}</p>
        </div>

        <div class="space-y-4 mb-8">
            <div class="flex justify-between text-sm">
                <span class="text-slate-400">Amount:</span>
                <span class="font-bold text-orange-400">{{ $params['amount'] ?? '0.00' }} MAD</span>
            </div>
            <div class="flex justify-between text-sm">
                <span class="text-slate-400">Merchant ID:</span>
                <span class="text-white">{{ $params['clientid'] ?? 'Missing' }}</span>
            </div>
            <div class="flex justify-between text-sm italic text-xs text-slate-500">
                <span>Hash Validated:</span>
                <span class="text-green-500">YES (Local Mock)</span>
            </div>
        </div>

        <form action="{{ $params['callbackUrl'] ?? '' }}" method="POST" class="space-y-3">
            @foreach($params as $key => $value)
                <input type="hidden" name="{{ $key }}" value="{{ $value }}">
            @endforeach
            <input type="hidden" name="ProcReturnCode" value="00"> <!-- 00 = Success -->
            
            <button type="submit" class="w-full py-4 bg-orange-600 hover:bg-orange-500 rounded-xl font-bold transition-all shadow-lg shadow-orange-900/20">
                Confirm & Pay
            </button>
            <a href="{{ $params['failUrl'] ?? '#' }}" class="block text-center text-sm text-slate-500 hover:text-slate-400">
                Cancel Transaction
            </a>
        </form>

        <p class="text-[10px] text-center text-slate-600 mt-6 uppercase tracking-widest font-bold">
            Internal Test Environment
        </p>
    </div>
</body>
</html>
