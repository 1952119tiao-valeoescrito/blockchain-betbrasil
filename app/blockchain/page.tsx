import React from 'react';
import './BlockchainPage.css';

const BlockchainPage: React.FC = () => {
  return (
    <div className="blockchain-page">
      <header className="page-header">
        <div className="container">
          <h1>O que é Blockchain?</h1>
          <p className="lead">
            Mais do que a tecnologia por trás do Bitcoin, o blockchain é um sistema de registro 
            descentralizado que mudou transações, validação de informações e segurança digital.
          </p>
        </div>
      </header>

      <main className="page-content">
        <div className="container">
          {/* Introdução */}
          <section className="intro-section">
            <p>
              Entender o que é blockchain e por que investidores pesquisam tanto sobre o termo 
              é essencial para se posicionar em um cenário conectado, transparente e automatizado.
            </p>
            
            <div className="brazil-reality">
              <h2>Blockchain no Brasil: Uma Realidade em Expansão</h2>
              <p>
                A verdade é que, no Brasil, isso já é uma realidade. O país é hoje a sexta maior 
                força em adoção de criptoativos no mundo, com mais de 26 milhões de pessoas 
                investidoras e ecossistema em expansão.
              </p>
              <p>
                Startups, grandes empresas e mesmo o setor público exploram a tecnologia blockchain 
                em soluções que vão desde carteiras de identidade digitais até plataformas de 
                tokenização de ativos. Ações que correm em um ambiente regulatório que avança para 
                garantir segurança e transparência.
              </p>
            </div>
          </section>

          {/* Resumo dos 7 pontos */}
          <section className="key-points-section">
            <h2>O que é blockchain: 7 pontos que você precisa saber</h2>
            <div className="key-points-grid">
              <div className="key-point">
                <h3>1. Tecnologia de Registro Descentralizado</h3>
                <p>Blockchain é uma tecnologia de registro descentralizado usada para validar e armazenar transações de forma segura, transparente e imutável.</p>
              </div>
              
              <div className="key-point">
                <h3>2. Vai Além do Bitcoin</h3>
                <p>Bitcoin foi a primeira aplicação real de blockchain, mas a tecnologia já é usada em diversos setores além das criptomoedas.</p>
              </div>
              
              <div className="key-point">
                <h3>3. Base de Segurança</h3>
                <p>A segurança em blockchain se baseia em criptografia, descentralização e mecanismos de consenso, como o Proof of Work (PoW) e o Proof of Stake (PoS).</p>
              </div>
              
              <div className="key-point">
                <h3>4. Estrutura de Blocos</h3>
                <p>Cada bloco possui um conjunto de transações ligadas por um hash único, formando uma cadeia inviolável que impede fraudes e alterações.</p>
              </div>
              
              <div className="key-point">
                <h3>5. Smart Contracts e DeFi</h3>
                <p>Smart contracts e DeFi utilizam blockchain para automatizar negociações financeiras sem intermediários.</p>
              </div>
              
              <div className="key-point">
                <h3>6. Aplicações no Brasil</h3>
                <p>No Brasil, blockchain é utilizada em áreas como saúde, logística e identidade digital.</p>
              </div>
              
              <div className="key-point">
                <h3>7. Base para Web3 e Metaverso</h3>
                <p>Blockchain também é base para a Web3, tokenização e metaverso, então abre caminho para novo modelo de economia digital.</p>
              </div>
            </div>
          </section>

          {/* Como funciona */}
          <section className="how-it-works-section">
            <h2>O que é blockchain e como funciona?</h2>
            <div className="content-block">
              <p>
                O blockchain é um sistema descentralizado que registra transações de maneira 
                segura e transparente em blocos encadeados, portanto, imutáveis. Cada bloco 
                contém informações que são validadas pela rede, o que garante transparência, 
                segurança e confiança, sem a necessidade de intermediários.
              </p>
              
              <h3>O livro-razão distribuído que ninguém pode apagar</h3>
              <p>
                O blockchain é um banco de dados descentralizado que organiza informações em 
                blocos interligados com o propósito de garantir que os registros sejam permanentes 
                e confiáveis. Cada bloco contém um grupo de transações, um identificador único 
                (hash) e uma referência ao bloco anterior.
              </p>
            </div>

            {/* Processo em 6 etapas */}
            <div className="process-steps">
              <h3>Como funciona o registro dos blocos e transações na blockchain?</h3>
              
              <div className="step">
                <h4>1. Criação da Transação</h4>
                <p>A pessoa usuária cria a transação na rede blockchain, que é assinada digitalmente e transmitida para a rede.</p>
              </div>
              
              <div className="step">
                <h4>2. Propagação na Rede</h4>
                <p>A ação é propagada entre os nós (participantes da rede) e aguarda a validação.</p>
              </div>
              
              <div className="step">
                <h4>3. Agrupamento em Blocos</h4>
                <p>As transações são reunidas em um bloco que contém conjunto de transações, identificador (hash) e hash do bloco anterior.</p>
              </div>
              
              <div className="step">
                <h4>4. Validação por Consenso</h4>
                <p>Validação através de mecanismos como Proof of Work (PoW) ou Proof of Stake (PoS).</p>
              </div>
              
              <div className="step">
                <h4>5. Registro na Blockchain</h4>
                <p>O novo bloco é adicionado à cadeia existente, criando uma sequência imutável.</p>
              </div>
              
              <div className="step">
                <h4>6. Atualização Distribuída</h4>
                <p>O novo bloco é replicado para todos os nós da rede, mantendo todas as cópias sincronizadas.</p>
              </div>
            </div>
          </section>

          {/* Tipos de Blockchain */}
          <section className="types-section">
            <h2>Tipos de Blockchain</h2>
            
            <div className="types-comparison">
              <div className="blockchain-type public">
                <h3>Blockchain Pública</h3>
                <ul>
                  <li><strong>Acesso:</strong> Qualquer pessoa pode participar</li>
                  <li><strong>Descentralização:</strong> Totalmente descentralizada</li>
                  <li><strong>Transparência:</strong> Alta - qualquer um pode auditar</li>
                  <li><strong>Segurança:</strong> Extremamente segura contra ataques</li>
                  <li><strong>Velocidade:</strong> Mais lenta devido à alta demanda</li>
                  <li><strong>Exemplos:</strong> Bitcoin, Ethereum, Solana</li>
                </ul>
              </div>
              
              <div className="blockchain-type private">
                <h3>Blockchain Privada</h3>
                <ul>
                  <li><strong>Acesso:</strong> Restrito a usuários autorizados</li>
                  <li><strong>Descentralização:</strong> Controlada por uma entidade</li>
                  <li><strong>Transparência:</strong> Baixa - apenas membros têm acesso</li>
                  <li><strong>Segurança:</strong> Segurança depende da governança interna</li>
                  <li><strong>Velocidade:</strong> Mais rápida e eficiente</li>
                  <li><strong>Exemplos:</strong> Hyperledger, Quorum, Corda</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Segurança */}
          <section className="security-section">
            <h2>Segurança no blockchain: por que a cadeia é confiável?</h2>
            
            <div className="security-content">
              <p>
                O blockchain é bastante seguro porque usa criptografia avançada, descentralização 
                e mecanismos de consenso para validar transações. Cada bloco contém um hash 
                criptográfico único que se liga ao anterior, formando uma cadeia inviolável.
              </p>
              
              <h3>Criptografia e imutabilidade</h3>
              <p>
                Toda transação no blockchain é protegida por um sistema de criptografia de ponta. 
                Cada transação gera um hash único que serve como "impressão digital" da transação.
              </p>
              
              <h3>Mecanismos de Consenso</h3>
              
              <div className="consensus-mechanism">
                <h4>Proof of Work (PoW)</h4>
                <p>
                  <strong>Vantagens:</strong> Extremamente seguro, ajuda a descentralizar a rede<br/>
                  <strong>Desvantagens:</strong> Alto consumo de energia, menos escalável
                </p>
              </div>
              
              <div className="consensus-mechanism">
                <h4>Proof of Stake (PoS)</h4>
                <p>
                  <strong>Vantagens:</strong> Mais sustentável, mais rápido e escalável<br/>
                  <strong>Desvantagens:</strong> Pode favorecer grandes investidores
                </p>
              </div>
            </div>
          </section>

          {/* Aplicações no Brasil */}
          <section className="brazil-applications">
            <h2>Aplicações reais da Blockchain no Brasil</h2>
            
            <div className="applications-grid">
              <div className="application">
                <h3>Saúde Pública</h3>
                <p>
                  Ministério da Saúde registrou mais de 2,2 bilhões de dados em blockchain 
                  através da Rede Nacional de Dados em Saúde (RNDS).
                </p>
              </div>
              
              <div className="application">
                <h3>Logística</h3>
                <p>
                  Correios buscam soluções baseadas em blockchain e IA para reduzir perdas 
                  e acelerar entregas.
                </p>
              </div>
              
              <div className="application">
                <h3>Identidade Digital</h3>
                <p>
                  Implementação de carteiras de identidade digitais seguras e verificáveis.
                </p>
              </div>
            </div>
          </section>

          {/* Futuro e Tendências */}
          <section className="future-section">
            <h2>O futuro do blockchain: tendências e inovações</h2>
            
            <div className="trends">
              <h3>Principais Tendências</h3>
              
              <div className="trend">
                <h4>Web3 e Metaverso</h4>
                <p>Blockchain como base para propriedade digital, economia virtual e identidade descentralizada.</p>
              </div>
              
              <div className="trend">
                <h4>Escalabilidade e Layer-2</h4>
                <p>Soluções como Lightning Network e Rollups para aumentar capacidade de transações.</p>
              </div>
              
              <div className="trend">
                <h4>Integração com IA</h4>
                <p>Criação de contratos inteligentes mais sofisticados que aprendem e se adaptam.</p>
              </div>
              
              <div className="trend">
                <h4>Tokenização de Ativos</h4>
                <p>Propriedades, ações e obras de arte tokenizadas para investimentos fracionados.</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="page-footer">
        <div className="container">
          <p>© 2025 - Guia Completo sobre Blockchain</p>
        </div>
      </footer>
    </div>
  );
};

export default BlockchainPage;