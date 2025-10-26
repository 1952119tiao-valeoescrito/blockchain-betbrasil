// app/api/admin/invite/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, role } = await request.json();

    // Validação básica
    if (!email || !role) {
      return NextResponse.json(
        { error: 'Email e role são obrigatórios' },
        { status: 400 }
      );
    }

    // Aqui você pode:
    // - Gerar token único para o convite
    // - Salvar no banco de dados
    // - Enviar email com link de ativação
    // - Validar permissões do usuário que está convidando

    const inviteToken = generateInviteToken();
    
    // Exemplo: Salvar no banco (fake)
    console.log('Convite criado:', { email, role, inviteToken });

    return NextResponse.json({
      success: true,
      message: 'Convite enviado com sucesso',
      inviteToken
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

function generateInviteToken(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}