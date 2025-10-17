import React from 'react';

const TermsAndPrivacy: React.FC = () => {
  const platformName = "[Nome da Plataforma]";
  const currentDate = "[Data Atual, ex: 10 de maio de 2024]";
  const companyName = "[Nome da Empresa/Entidade Responsável]";
  const cnpj = "[Número do CNPJ, se aplicável]";
  const address = "[Endereço da Sede, se aplicável]";
  const jurisdiction = "[País/Jurisdição, ex: República Federativa do Brasil]";
  const cityState = "[Cidade/Estado, ex: Rio de Janeiro, RJ]";
  const supportEmail = "[endereço de e-mail de suporte]";
  const phoneNumber = "+55 (21) 99352-7957";

  return (
    <div className="terms-privacy-container">
      <h1>TERMOS DE USO DA PLATAFORMA {platformName}</h1>
      <p><strong>Última atualização: {currentDate}</strong></p>

      <p>Bem-vindo(a) à {platformName}!</p>

      <p>Estes Termos de Uso ("Termos") regem o acesso e a utilização da nossa plataforma de investimento e entretenimento gamificado ("Plataforma"). Ao acessar, navegar ou utilizar a Plataforma, você concorda em cumprir e estar vinculado(a) a estes Termos, à nossa Política de Privacidade e a todas as leis e regulamentos aplicáveis. Se você não concordar com qualquer parte destes Termos, você não deve utilizar a Plataforma.</p>

      <p>A Plataforma {platformName} é operada por {companyName}, inscrita no CNPJ/MF sob o nº {cnpj}, com sede em {address}, doravante denominada "Nós" ou "Empresa".</p>

      <h2>1. Aceitação dos Termos</h2>
      <p>Ao utilizar a Plataforma, você declara ter lido, compreendido e aceito integralmente estes Termos de Uso. Estes Termos podem ser atualizados periodicamente, e a continuidade do uso da Plataforma após tais alterações constitui sua aceitação dos Termos revisados.</p>

      <h2>2. Elegibilidade e Restrições de Idade</h2>
      <p>A Plataforma é destinada exclusivamente a indivíduos maiores de 18 (dezoito) anos de idade. Ao aceitar estes Termos, você declara e garante que possui a idade legal mínima exigida. A Empresa reserva-se o direito de solicitar comprovação de idade e de suspender ou encerrar contas que não atendam a este requisito.</p>

      <h2>3. Natureza da Plataforma</h2>
      <p>A {platformName} oferece uma experiência de entretenimento gamificado baseada em <strong>aplicações</strong> e prognósticos em um ambiente descentralizado (blockchain). A Plataforma não se destina a ser um serviço de consultoria financeira, e as <strong>aplicações</strong> realizadas são para fins de entretenimento. Os resultados são baseados em mecanismos de aleatoriedade auditáveis e transparentes (VRF - Verifiable Random Function), conforme evidenciado no código-fonte dos contratos inteligentes.</p>

      <h2>4. Definições</h2>
      <ul>
        <li><strong>Plataforma:</strong> O site, aplicativo e contratos inteligentes que compõem o ambiente de investimento e entretenimento gamificado.</li>
        <li><strong>Usuário/Jogador:</strong> Qualquer pessoa física que acessa e utiliza a Plataforma, após concordar com estes Termos.</li>
        <li><strong>Aplicação:</strong> O ato de um Usuário realizar um prognóstico dentro da Plataforma, utilizando criptoativos (stablecoins) conforme as regras de cada rodada ou modalidade de jogo.</li>
        <li><strong>Rodada:</strong> Um ciclo de jogo específico na Plataforma, com duração e regras predefinidas para as <strong>aplicações</strong> e distribuição de prêmios.</li>
        <li><strong>Contratos Inteligentes:</strong> Os códigos de programação executados na blockchain que governam as operações da Plataforma, incluindo o registro de <strong>aplicações</strong>, sorteio de resultados e distribuição de prêmios.</li>
      </ul>

      <h2>5. Cadastro e Conta de Usuário</h2>
      <p>Para utilizar a Plataforma, poderá ser necessário criar uma conta ou conectar uma carteira de criptoativos compatível. Você é responsável por:</p>
      <ul>
        <li>Fornecer informações precisas, completas e atualizadas.</li>
        <li>Manter a confidencialidade das credenciais de sua carteira e de sua conta.</li>
        <li>Todas as atividades que ocorram sob sua conta.</li>
      </ul>
      <p>A Empresa não se responsabiliza por perdas resultantes do uso não autorizado de sua conta.</p>

      <h2>6. Das Aplicações e Prêmios</h2>
      <ul>
        <li><strong>Mecanismo:</strong> As <strong>aplicações</strong> são realizadas utilizando stablecoins (criptomoedas com valor atrelado a moedas fiduciárias, como o dólar). Os detalhes sobre o custo de cada <strong>aplicação</strong>, a mecânica de pontuação e a distribuição de prêmios estão descritos nas regras de cada jogo e são governados pelos contratos inteligentes da Plataforma.</li>
        <li><strong>Transparência:</strong> A lógica de cálculo de prêmios e o processo de sorteio de resultados são transparentes e auditáveis na blockchain, utilizando sistemas como o Chainlink VRF para aleatoriedade verificável.</li>
        <li><strong>Reivindicação de Prêmios:</strong> Os prêmios devem ser reivindicados pelos Usuários através da funcionalidade disponível na Plataforma, conforme os termos estabelecidos pelos contratos inteligentes. A Empresa não se responsabiliza por prêmios não reivindicados dentro de prazos ou condições específicas.</li>
        <li><strong>Impostos:</strong> O Usuário é o único responsável por quaisquer impostos, taxas ou encargos que possam incidir sobre os prêmios recebidos, conforme a legislação de sua jurisdição.</li>
      </ul>

      <h2>7. Riscos Envolvidos</h2>
      <p>Ao utilizar a Plataforma, você reconhece e aceita os seguintes riscos:</p>
      <ul>
        <li><strong>Volatilidade de Criptoativos:</strong> Embora a Plataforma utilize stablecoins para <strong>aplicações</strong> e prêmios, o mercado de criptoativos pode ser volátil, e o valor de outros criptoativos em sua carteira pode flutuar.</li>
        <li><strong>Riscos de Contrato Inteligente:</strong> Embora nossos contratos inteligentes sejam projetados com segurança em mente, falhas, bugs ou explorações são riscos inerentes à tecnologia blockchain.</li>
        <li><strong>Riscos de Rede:</strong> Problemas de conectividade, congestionamento da rede blockchain ou falhas de software podem afetar o desempenho ou a acessibilidade da Plataforma.</li>
        <li><strong>Resultados das Aplicações e Mecanismo de Bônus:</strong> As <strong>aplicações</strong> são parte de um sistema gamificado. Embora a Plataforma integre o "Sistema Todo Mundo Ganha", que concede bônus e/ou free <strong>aplicações</strong> mesmo em cenários de não acertos diretos, o retorno sobre o valor da <strong>aplicação</strong> inicial é variável e dependente dos resultados e da performance na rodada. <strong>A Plataforma é uma experiência de entretenimento gamificado com mecanismos de recompensa, e não garante um retorno financeiro fixo ou a recuperação integral do valor aplicado em todas as situações.</strong></li>
        <li><strong>Acesso e Segurança da Carteira:</strong> Você é o único responsável pela segurança de sua carteira de criptoativos. A Empresa não tem acesso às suas chaves privadas e não pode recuperar fundos perdidos devido a acesso não autorizado ou perda de chaves.</li>
      </ul>

      <h2>8. Conduta do Usuário</h2>
      <p>Você concorda em não:</p>
      <ul>
        <li>Utilizar a Plataforma para fins ilegais ou não autorizados.</li>
        <li>Tentar manipular os resultados ou o funcionamento da Plataforma.</li>
        <li>Engajar-se em atividades fraudulentas ou enganosas.</li>
        <li>Distribuir vírus, malware ou qualquer outro código malicioso.</li>
        <li>Assediar, abusar ou prejudicar outros Usuários.</li>
        <li>Coletar ou armazenar dados pessoais de outros Usuários sem consentimento.</li>
      </ul>

      <h2>9. Propriedade Intelectual</h2>
      <p>Todo o conteúdo da Plataforma, incluindo textos, gráficos, logotipos, ícones, imagens, clipes de áudio, downloads digitais e o software, é propriedade da Empresa ou de seus licenciadores e é protegido por leis de direitos autorais e outras leis de propriedade intelectual.</p>

      <h2>10. Limitação de Responsabilidade</h2>
      <p>Na máxima extensão permitida pela lei aplicável, a Empresa não será responsável por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos, ou qualquer perda de lucros ou receitas, incorridos direta ou indiretamente, ou qualquer perda de dados, uso, boa vontade ou outras perdas intangíveis, resultantes de:</p>
      <ul>
        <li>Seu acesso ou uso, ou incapacidade de acesso ou uso, da Plataforma.</li>
        <li>Qualquer conduta ou conteúdo de terceiros na Plataforma.</li>
        <li>Qualquer conteúdo obtido da Plataforma.</li>
        <li>Acesso não autorizado, uso ou alteração de suas transmissões ou conteúdo, seja com base em garantia, contrato, delito (incluindo negligência) ou qualquer outra teoria legal.</li>
      </ul>

      <h2>11. Indenização</h2>
      <p>Você concorda em indenizar e isentar a Empresa, seus diretores, funcionários, parceiros e agentes de e contra quaisquer reivindicações, responsabilidades, danos, perdas e despesas, incluindo, sem limitação, honorários advocatícios razoáveis, decorrentes de ou de alguma forma relacionados ao seu acesso ou uso da Plataforma, sua violação destes Termos ou sua violação de quaisquer direitos de terceiros.</p>

      <h2>12. Rescisão</h2>
      <p>A Empresa pode suspender ou encerrar seu acesso à Plataforma a qualquer momento, por qualquer motivo, com ou sem aviso prévio, incluindo, mas não se limitando a, violação destes Termos.</p>

      <h2>13. Disposições Gerais</h2>
      <ul>
        <li><strong>Lei Aplicável e Foro:</strong> Estes Termos serão regidos e interpretados de acordo com as leis da {jurisdiction}. Fica eleito o Foro da Comarca de {cityState} para dirimir quaisquer dúvidas ou litígios decorrentes destes Termos.</li>
        <li className="contact-info"><strong>Contato:</strong> Para quaisquer dúvidas ou informações sobre estes Termos de Uso, entre em contato conosco através do e-mail {supportEmail} ou pelo telefone: <strong>{phoneNumber}</strong>.</li>
        <li><strong>Independência das Cláusulas:</strong> Se qualquer disposição destes Termos for considerada inválida ou inexequível, as demais disposições permanecerão em pleno vigor e efeito.</li>
      </ul>
      <p>Ao continuar a usar a Plataforma {platformName}, você confirma que leu, entendeu e concordou com estes Termos de Uso.</p>

      <hr style={{ margin: '50px 0' }} />

      <h1>POLÍTICA DE PRIVACIDADE DA PLATAFORMA {platformName}</h1>
      <p><strong>Última atualização: {currentDate}</strong></p>

      <p>A {platformName} ("Nós", "Nosso" ou "Empresa") valoriza a sua privacidade e está comprometida em proteger as informações pessoais que você nos confia. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações ao utilizar nossa plataforma de investimento e entretenimento gamificado ("Plataforma").</p>

      <p>Ao acessar ou utilizar a Plataforma, você concorda com a coleta e o uso de suas informações conforme descrito nesta Política de Privacidade.</p>

      <h2>1. Informações que Coletamos</h2>
      <p>A natureza descentralizada (blockchain) da nossa Plataforma significa que a coleta de dados pessoais é minimizada. No entanto, algumas informações podem ser processadas:</p>
      <ul>
        <li><strong>Dados da Carteira de Criptoativos:</strong> Quando você conecta sua carteira à Plataforma, coletamos e processamos o endereço público da sua carteira. Este endereço é essencial para registrar suas <strong>aplicações</strong>, distribuir prêmios e interagir com nossos contratos inteligentes na blockchain.</li>
        <li><strong>Dados de Transação na Blockchain:</strong> Todas as <strong>aplicações</strong> e transações de prêmios são registradas publicamente na blockchain. Isso inclui o endereço da sua carteira, o valor das <strong>aplicações</strong>, os prognósticos realizados e os prêmios recebidos. Essas informações são inerentemente públicas e transparentes na rede blockchain.</li>
        <li><strong>Dados de Uso da Plataforma (Não Pessoais):</strong> Podemos coletar informações sobre como você interage com a interface da Plataforma, como páginas visitadas, tempo de permanência, recursos utilizados e erros encontrados. Esses dados são geralmente agregados e anonimizados e usados para melhorar a funcionalidade e a experiência do usuário, sem identificar você pessoalmente.</li>
        <li><strong>Informações de Contato (Opcional):</strong> Se você entrar em contato conosco para suporte ou dúvidas através dos canais disponibilizados, podemos coletar as informações que você nos fornecer, como seu nome e endereço de e-mail, para responder à sua solicitação.</li>
      </ul>
      <p><strong>Não Coletamos:</strong><br />Não coletamos nomes completos, CPFs, endereços residenciais, números de documentos de identidade, nem outras informações de identificação pessoal (PII) diretamente da sua parte, a menos que você as forneça voluntariamente em um contato de suporte.</p>

      <h2>2. Como Usamos Suas Informações</h2>
      <p>Utilizamos as informações coletadas para:</p>
      <ul>
        <li><strong>Operacionalizar a Plataforma:</strong> Registrar suas <strong>aplicações</strong>, processar resultados, distribuir prêmios e gerenciar sua participação nas rodadas do jogo, tudo conforme os contratos inteligentes.</li>
        <li><strong>Segurança e Integridade:</strong> Garantir a segurança e a integridade da Plataforma e dos contratos inteligentes, prevenindo fraudes e usos indevidos.</li>
        <li><strong>Melhoria da Plataforma:</strong> Analisar o comportamento de uso (de forma agregada e anonimizada) para aprimorar a funcionalidade, o design e a experiência do usuário da Plataforma.</li>
        <li><strong>Suporte ao Usuário:</strong> Responder às suas perguntas e fornecer suporte técnico quando você entrar em contato.</li>
        <li><strong>Conformidade Legal:</strong> Cumprir com obrigações legais, regulatórias ou fiscais aplicáveis, embora a Plataforma seja projetada para minimizar a coleta de PII.</li>
      </ul>

      <h2>3. Compartilhamento de Informações</h2>
      <p>A natureza descentralizada da blockchain implica que o endereço da sua carteira e o histórico de transações são publicamente visíveis na rede. Além disso, podemos compartilhar informações:</p>
      <ul>
        <li><strong>Com Provedores de Serviço:</strong> Podemos contratar terceiros para realizar serviços em nosso nome, como hospedagem da Plataforma, análise de dados ou suporte técnico. Esses prestadores de serviços terão acesso limitado às suas informações apenas para realizar suas tarefas e são obrigados a mantê-las confidenciais.</li>
        <li><strong>Para Cumprimento Legal:</strong> Podemos divulgar suas informações se exigido por lei, regulamentação, processo legal ou solicitação governamental, ou para proteger nossos direitos, privacidade, segurança ou propriedade.</li>
        <li><strong>Em Agregações e Anonimizações:</strong> Podemos compartilhar dados agregados e anonimizados que não identificam você pessoalmente para fins de pesquisa, análise de mercado, estatísticas ou melhoria da Plataforma.</li>
      </ul>

      <h2>4. Retenção de Dados</h2>
      <p>Os dados de transação registrados na blockchain são imutáveis e persistirão indefinidamente na rede, conforme a natureza da tecnologia blockchain.<br />Outras informações coletadas por meios tradicionais (como comunicação de suporte) serão retidas apenas pelo tempo necessário para cumprir as finalidades para as quais foram coletadas ou para cumprir obrigações legais.</p>

      <h2>5. Segurança das Informações</h2>
      <p>Implementamos medidas de segurança técnicas e organizacionais razoáveis para proteger as informações sob nosso controle contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, lembre-se que nenhum método de transmissão pela internet ou de armazenamento eletrônico é 100% seguro. Você é responsável pela segurança de sua carteira de criptoativos e suas chaves privadas.</p>

      <h2>6. Seus Direitos de Privacidade</h2>
      <p>Dado o design da Plataforma para minimizar a coleta de dados pessoais e a natureza pública dos dados na blockchain, seus direitos de privacidade podem ser exercidos de forma diferente em comparação com plataformas centralizadas.</p>
      <ul>
        <li><strong>Acesso e Portabilidade:</strong> Você pode acessar o histórico de suas <strong>aplicações</strong> e prêmios diretamente na blockchain, utilizando exploradores de blocos com o endereço da sua carteira.</li>
        <li><strong>Exclusão/Retificação:</strong> Não podemos excluir ou retificar informações que já foram registradas na blockchain, pois são imutáveis por design. Para informações que não estão na blockchain e que você forneceu diretamente (ex: contato de suporte), você pode solicitar retificação ou exclusão, sujeito a obrigações legais.</li>
      </ul>

      <h2>7. Links para Terceiros</h2>
      <p>Nossa Plataforma pode conter links para sites ou serviços de terceiros que não são operados por nós. Não somos responsáveis pelas práticas de privacidade desses terceiros. Recomendamos que você revise as políticas de privacidade de qualquer site de terceiros que visitar.</p>

      <h2>8. Alterações a Esta Política de Privacidade</h2>
      <p>Podemos atualizar esta Política de Privacidade periodicamente. Publicaremos a nova versão nesta página, indicando a data da "última atualização". A continuidade do uso da Plataforma após tais alterações constitui sua aceitação da Política de Privacidade revisada.</p>

      <h2>9. Contato</h2>
      <div className="contact-info">
        <p>Se tiver dúvidas sobre esta Política de Privacidade ou sobre nossas práticas de dados, entre em contato conosco através do e-mail {supportEmail} ou pelo telefone: <strong>{phoneNumber}</strong>.</p>
      </div>
    </div>
  );
};

export default TermsAndPrivacy;