// app/api/admin/auth/route.ts - CRIA ISSO!
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  
  // 🔥 CREDENCIAIS FIXAS - MUDE DEPOIS!
  if (email === 'admin@betbrasil.com' && password === 'admin123') {
    return NextResponse.json({
      success: true,
      token: 'web3-admin-token',
      role: 'super-admin',
      user: { email, role: 'super-admin' }
    });
  }
  
  return NextResponse.json(
    { success: false, message: 'Credenciais inválidas' },
    { status: 401 }
  );
}