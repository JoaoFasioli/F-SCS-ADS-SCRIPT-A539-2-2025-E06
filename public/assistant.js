// SOSustentável Assistant Response Page
// This module handles the AI assistant response page, including:
// - Reading query parameters from URL
// - Simulating response generation
// - Displaying appropriate content based on intent
// - Handling user interactions (copy, share, etc.)

import {copyToClipboard, showToast} from './js/utils.js';

// Query selectors for main elements
const elements = {
    badge: document.getElementById('badge-text'),
    badgeIcon: document.querySelector('.badge-icon'),
    materialName: document.getElementById('material-name'),
    loadingState: document.getElementById('loading-state'),
    responseContent: document.getElementById('response-content'),
    mapContainer: document.getElementById('map-container'),
    copyBtn: document.getElementById('copy-response'),
    relatedSection: document.getElementById('related-articles'),
    relatedGrid: document.getElementById('related-grid')
};

// Mock response database based on intent type
// In a real implementation, this would come from your AI API
const responseTemplates = {
    reduzir: {
        icon: '🔻',
        badgeText: 'Reduzir o Consumo',
        generateContent: (material) => `
            <h3>Como reduzir o consumo de ${material}</h3>
            <p>Reduzir é a forma mais eficaz de diminuir seu impacto ambiental. Quando se trata de ${material}, existem várias estratégias que você pode implementar no seu dia a dia.</p>
            
            <div class="tip-box">
                <h4>💡 Dica Principal</h4>
                <p>Antes de adquirir produtos feitos de ${material}, pergunte-se: "Eu realmente preciso disso?" Esta simples reflexão pode reduzir drasticamente seu consumo.</p>
            </div>

            <h3>Estratégias práticas de redução</h3>
            <p><strong>1. Avalie suas necessidades reais:</strong> Muitas vezes compramos por impulso ou por influência externa. Faça uma lista do que você realmente precisa antes de fazer compras.</p>
            
            <p><strong>2. Prefira qualidade sobre quantidade:</strong> Produtos de melhor qualidade feitos com ${material} duram mais tempo, reduzindo a necessidade de substituição frequente.</p>
            
            <p><strong>3. Compartilhe recursos:</strong> Considere compartilhar itens com vizinhos, amigos ou familiares. Muitos objetos são usados apenas ocasionalmente e podem ser compartilhados.</p>
            
            <p><strong>4. Busque alternativas sustentáveis:</strong> Pesquise se existem alternativas mais ecológicas ao ${material} que atendam às suas necessidades.</p>

            <h3>Benefícios da redução</h3>
            <ul>
                <li>Economia financeira significativa ao longo do tempo</li>
                <li>Redução da pegada de carbono e impacto ambiental</li>
                <li>Menos desperdício e acúmulo de objetos desnecessários</li>
                <li>Contribuição para uma economia mais circular</li>
            </ul>

            <div class="success-box">
                <h4>✅ Impacto Real</h4>
                <p>Estudos mostram que reduzir o consumo em apenas 20% pode diminuir sua pegada ecológica em até 30%, pois você evita toda a cadeia de produção, transporte e descarte.</p>
            </div>

            <h3>Próximos passos</h3>
            <p>Comece pequeno: escolha uma área da sua vida onde você usa ${material} frequentemente e estabeleça uma meta de redução de 10-20%. Monitore seus resultados por um mês e ajuste conforme necessário.</p>
        `
    },

    reutilizar: {
        icon: '🔄',
        badgeText: 'Reutilizar Material',
        generateContent: (material) => `
            <h3>Maneiras criativas de reutilizar ${material}</h3>
            <p>A reutilização prolonga a vida útil dos materiais e reduz a necessidade de novos recursos. O ${material} pode ter diversas aplicações além de seu uso original.</p>

            <div class="tip-box">
                <h4>💡 Princípio da Reutilização</h4>
                <p>Antes de descartar ${material}, pense: "Este item pode ter outro uso, mesmo que diferente do original?" A criatividade é sua melhor ferramenta!</p>
            </div>

            <h3>Ideias práticas de reutilização</h3>
            <p><strong>Uso doméstico:</strong> O ${material} pode ser transformado em organizadores, recipientes de armazenamento, ou até mesmo elementos decorativos. Limpe bem o material antes de reutilizar.</p>

            <p><strong>Projetos DIY (Faça Você Mesmo):</strong> Existem inúmeros tutoriais online mostrando como transformar ${material} em objetos úteis e bonitos. De vasos para plantas a porta-canetas, as possibilidades são infinitas.</p>

            <p><strong>Doação e troca:</strong> Se você não precisa mais de um item feito de ${material}, mas ele continua em boas condições, considere doar para instituições ou trocar com outras pessoas.</p>

            <h3>Oficinas e recursos disponíveis</h3>
            <p>Muitas comunidades oferecem oficinas gratuitas de reutilização criativa. Verifique em centros comunitários, bibliotecas públicas ou cooperativas de reciclagem da sua região.</p>

            <div class="success-box">
                <h4>✅ Exemplos inspiradores</h4>
                <p>Artesãos locais têm criado produtos incríveis reutilizando ${material}. Isso não apenas reduz resíduos, mas também pode gerar renda e promover a economia criativa.</p>
            </div>

            <div class="warning-box">
                <h4>⚠️ Atenção</h4>
                <p>Nem todos os materiais podem ser reutilizados para qualquer finalidade. Certifique-se de que o ${material} está limpo e seguro para o novo uso pretendido, especialmente se for entrar em contato com alimentos ou crianças.</p>
            </div>

            <h3>Comece hoje mesmo</h3>
            <p>Separe alguns itens de ${material} que você estava prestes a descartar e pesquise três maneiras diferentes de reutilizá-los. Escolha a que mais faz sentido para sua rotina e experimente!</p>
        `
    },

    reciclar: {
        icon: '♻️',
        badgeText: 'Reciclar Material',
        generateContent: (material) => `
            <h3>Guia completo de reciclagem para ${material}</h3>
            <p>A reciclagem é o último recurso dos 3 R's, mas ainda assim é fundamental quando reduzir ou reutilizar não são possíveis. O ${material} pode ser reciclado de forma adequada seguindo as orientações abaixo.</p>

            <div class="warning-box">
                <h4>⚠️ Importante</h4>
                <p>Recicle apenas quando não for possível reduzir o consumo ou reutilizar o material. A reciclagem consome energia e recursos, então deve ser nossa última opção na hierarquia dos 3 R's.</p>
            </div>

            <h3>Como preparar ${material} para reciclagem</h3>
            <p><strong>1. Limpeza adequada:</strong> Lave e seque o ${material} antes de encaminhar para reciclagem. Resíduos orgânicos ou contaminantes podem inviabilizar o processo de reciclagem de todo um lote.</p>

            <p><strong>2. Separação correta:</strong> Verifique se há diferentes tipos ou componentes no item de ${material}. Alguns materiais compostos precisam ser desmontados antes da reciclagem.</p>

            <p><strong>3. Identificação:</strong> Procure por símbolos de reciclagem no produto. Eles indicam o tipo específico de ${material} e como deve ser reciclado.</p>

            <h3>Onde descartar ${material}</h3>
            <p>Na sua região, existem diversos pontos de coleta seletiva que aceitam ${material}. Verifique no mapa abaixo os locais mais próximos de você.</p>

            <div class="tip-box">
                <h4>💡 Dica de Ouro</h4>
                <p>Agrupe seus recicláveis e faça o descarte em lotes maiores. Isso reduz deslocamentos e torna o processo mais eficiente tanto para você quanto para os coletores.</p>
            </div>

            <h3>O ciclo da reciclagem</h3>
            <p>Quando você recicla ${material} corretamente, ele passa por processos industriais que o transformam em matéria-prima para novos produtos. Isso economiza recursos naturais e reduz a poluição.</p>

            <div class="success-box">
                <h4>✅ Impacto Ambiental</h4>
                <p>A reciclagem adequada de ${material} pode economizar até 95% da energia necessária para produzir o mesmo material a partir de recursos virgens, além de reduzir significativamente as emissões de gases de efeito estufa.</p>
            </div>

            <h3>Verifique os pontos de coleta mais próximos</h3>
            <p>Use o mapa interativo abaixo para encontrar cooperativas de reciclagem, ecopontos e outros locais que aceitam ${material} na sua região. Você também pode entrar em contato com a prefeitura local para informações sobre coleta seletiva domiciliar.</p>
        `,
        showMap: true
    }
};

// Related articles database
// These would typically come from your backend/CMS
const relatedArticles = {
    reduzir: [
        {
            title: 'Minimalismo e sustentabilidade: como consumir menos',
            excerpt: 'Descubra como a filosofia minimalista pode transformar seus hábitos de consumo.'
        },
        {
            title: 'Economia circular: o futuro do consumo consciente',
            excerpt: 'Entenda como a economia circular propõe um novo modelo de produção e consumo.'
        },
        {
            title: '30 dias sem compras: o desafio que mudou minha vida',
            excerpt: 'Relato pessoal sobre como um mês sem compras desnecessárias trouxe clareza.'
        }
    ],
    reutilizar: [
        {
            title: 'DIY: 50 projetos criativos com materiais reutilizados',
            excerpt: 'Inspire-se com ideias práticas e bonitas para dar nova vida aos seus objetos.'
        },
        {
            title: 'Upcycling: transformando lixo em luxo',
            excerpt: 'Conheça artistas e empresas que criam produtos incríveis a partir de resíduos.'
        },
        {
            title: 'Como criar uma oficina de reutilização na sua comunidade',
            excerpt: 'Passo a passo para engajar seus vizinhos em projetos de reutilização coletiva.'
        }
    ],
    reciclar: [
        {
            title: 'Mitos e verdades sobre reciclagem no Brasil',
            excerpt: 'Descubra o que realmente pode ser reciclado e como fazer da forma correta.'
        },
        {
            title: 'Cooperativas de reciclagem: como funcionam e como apoiar',
            excerpt: 'Entenda o papel fundamental dos catadores na cadeia de reciclagem.'
        },
        {
            title: 'O que acontece com seu lixo depois da coleta seletiva?',
            excerpt: 'Acompanhe a jornada dos materiais recicláveis desde sua casa até a indústria.'
        }
    ]
};

/**
 * Parses URL parameters to extract the query intent and material
 * Returns an object with intent and material, or null if invalid
 */
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const intent = params.get('intent');
    const material = params.get('material');

    // Validate that we have both required parameters
    if (!intent || !material) {
        return null;
    }

    // Validate that intent is one of the valid options
    if (!['reduzir', 'reutilizar', 'reciclar'].includes(intent)) {
        return null;
    }

    return {intent, material};
}

/**
 * Updates the query summary card with the user's query information
 */
function displayQuerySummary(intent, material) {
    const template = responseTemplates[intent];

    // Update badge icon and text
    elements.badgeIcon.textContent = template.icon;
    elements.badge.textContent = template.badgeText;

    // Update material name
    elements.materialName.textContent = material;
}

/**
 * Simulates loading and then displays the response content
 * In a real implementation, this would make an API call to your AI backend
 */
async function generateResponse(intent, material) {
    // Show loading state
    elements.loadingState.style.display = 'flex';
    elements.responseContent.style.display = 'none';

    // Simulate API delay (1.5-3 seconds for realism)
    const delay = 1500 + Math.random() * 1500;
    await new Promise(resolve => setTimeout(resolve, delay));

    // Get the appropriate template
    const template = responseTemplates[intent];

    // Generate and display content
    elements.responseContent.innerHTML = template.generateContent(material);

    // Hide loading, show content
    elements.loadingState.style.display = 'none';
    elements.responseContent.style.display = 'block';

    // Show map if this is a recycling query
    if (template.showMap) {
        elements.mapContainer.style.display = 'block';
        initializeMap();
    }

    // Show related articles
    displayRelatedArticles(intent);
}

/**
 * Initializes the map for recycling queries
 * In a real implementation, this would integrate with a mapping service like Leaflet or Google Maps
 */
function initializeMap() {
    const mapElement = document.getElementById('map');

    // For now, we'll create a simple placeholder
    // In production, you would initialize a real map here with:
    // - User's current location
    // - Nearby recycling centers from your database
    // - Interactive markers and info windows

    mapElement.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; flex-direction: column; gap: 1rem; color: #64748b;">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <p style="margin: 0; text-align: center; max-width: 300px;">
                Mapa interativo de pontos de coleta<br>
                <small>(Funcionalidade em desenvolvimento)</small>
            </p>
        </div>
    `;
}

/**
 * Displays related articles based on the intent
 */
function displayRelatedArticles(intent) {
    const articles = relatedArticles[intent];

    if (!articles || articles.length === 0) {
        return;
    }

    // Clear existing content
    elements.relatedGrid.innerHTML = '';

    // Create article cards
    articles.forEach(article => {
        const card = document.createElement('a');
        card.href = '#'; // In production, this would link to the actual article
        card.className = 'related-card';
        card.innerHTML = `
            <h4>${article.title}</h4>
            <p>${article.excerpt}</p>
        `;
        elements.relatedGrid.appendChild(card);
    });

    // Show the section
    elements.relatedSection.style.display = 'block';
}

/**
 * Handles copying the response to clipboard
 */
async function handleCopyResponse() {
    // Get the text content from the response
    const responseText = elements.responseContent.innerText;

    if (!responseText) {
        showToast('Nenhuma resposta para copiar', {type: 'err'});
        return;
    }

    // Attempt to copy
    const success = await copyToClipboard(responseText);

    if (success) {
        showToast('Resposta copiada com sucesso!', {type: 'ok'});
    } else {
        showToast('Erro ao copiar. Tente novamente.', {type: 'err'});
    }
}

/**
 * Handles errors by showing a user-friendly message
 */
function handleError(message) {
    elements.loadingState.style.display = 'none';
    elements.responseContent.style.display = 'block';
    elements.responseContent.innerHTML = `
        <div class="warning-box">
            <h4>⚠️ Ops!</h4>
            <p>${message}</p>
            <p style="margin-top: 1rem;">
                <a href="./index.html#assistente-inteligente" class="primary" style="text-decoration: none;">
                    Voltar e tentar novamente
                </a>
            </p>
        </div>
    `;
}

/**
 * Main initialization function
 */
function init() {
    // Get query parameters
    const queryData = getQueryParams();

    // Handle missing or invalid parameters
    if (!queryData) {
        handleError('Não foi possível processar sua solicitação. Parece que você chegou aqui sem fazer uma pergunta ao assistente.');
        return;
    }

    const {intent, material} = queryData;

    // Display the query summary
    displayQuerySummary(intent, material);

    // Generate and display the response
    generateResponse(intent, material).catch(error => {
        console.error('Error generating response:', error);
        handleError('Ocorreu um erro ao gerar a resposta. Por favor, tente novamente mais tarde.');
    });

    // Set up copy button
    elements.copyBtn.addEventListener('click', handleCopyResponse);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}