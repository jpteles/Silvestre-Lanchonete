import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';

// ⚠️ COLOQUE SEU EMAIL E SENHA DE ADMINISTRADOR AQUI ⚠️
const ADMIN_EMAIL = 'admin@silvestre.com';
const ADMIN_PASSWORD = '123456';

const dishes = [
  { nome: 'Virado à Paulista - Segunda-feira', valor: 'A partir de: R$ 24,90', imageSrc: '/assets/Virado_a_Paulista_1.jpg', desc: 'Acompanha arroz soltinho, feijão, couve, farofa, ovos e suculenta linguiça grelhada.' },
  { nome: 'Bife à rolê - Terça-feira', valor: 'A partir de: R$ 24,90', imageSrc: '/assets/bife_a_role.jpg', desc: 'Acompanha arroz soltinho, feijão e bife à rolê.' },
  { nome: 'Feijoada - Quarta-feira e Sábado', valor: 'A partir de: R$ 24,90', imageSrc: '/assets/feijoada.jpg', desc: 'Acompanha arroz soltinho, feijoada, couve, farofa, torresmo e bisteca.' },
  { nome: 'Macarrão com frango - Quinta-feira', valor: 'A partir de: R$ 24,90', imageSrc: '/assets/macarronada-coxa-sobrecoxa-frango 1.jpg', desc: 'Acompanha Macarrão ao molho e frango cozido.' },
  { nome: 'Filé de peixe - Sexta-feira', valor: 'A partir de: R$ 24,90', imageSrc: '/assets/file_de_peixe.jpg', desc: 'Acompanha arroz, feijão, filé de peixe empanado, batata frita e purê.' },
  { nome: 'Omelete', valor: 'A partir de: R$ 24,90', imageSrc: '/assets/omelete.jpg', desc: 'Acompanha omelete, arroz e feijão.' },
  { nome: 'Picadinho', valor: 'A partir de: R$ 24,90', imageSrc: '/assets/picadinho.jpg', desc: 'Acompanha arroz, feijão e picadinho de carne.' },
  { nome: 'Fígado Acebolado', valor: 'A partir de: R$ 24,90', imageSrc: '/assets/figado_acebolado.jpg', desc: 'Acompanha arroz, feijão e fígado acebolado.' },
  { nome: 'Bife à Milanesa', valor: 'A partir de: R$ 24,90', imageSrc: '/assets/bife_a_milanesa.jpg', desc: 'Acompanha arroz, feijão, bife à milanesa e batata frita.' },
  { nome: 'Bife à Cavalo', valor: 'A partir de: R$ 24,90', imageSrc: '/assets/bife_a_cavalo.jpg', desc: 'Acompanha arroz, feijão, bife à cavalo e batata frita.' },
  { nome: 'Frango à Passarinho', valor: 'A partir de: R$ 24,90', imageSrc: '/assets/frango_a_passarinho.jpg', desc: 'Acompanha arroz, feijão e frango à passarinho.' },
  { nome: 'Picanha', valor: 'A partir de: R$ 35,00', imageSrc: '/assets/picanha.jpg', desc: 'Acompanha picanha assada, feijão, arroz, farofa e vinagrete.' },
  { nome: 'Filé Mignon', valor: 'A partir de: R$ 32,00', imageSrc: '/assets/file_mignon.jpg', desc: 'Acompanha arroz, feijão, filé mignon e purê de batata.' },
  { nome: 'Contra Filé', valor: 'A partir de: R$ 32,00', imageSrc: '/assets/contra_file.jpg', desc: 'Acompanha arroz, feijão, contra filé e batata frita.' },
  { nome: 'Parmegiana', valor: 'A partir de: R$ 35,00', imageSrc: '/assets/parmegiana.jpg', desc: 'Acompanha arroz, a parmegiana de carne ou frango e batata frita.' },
  { nome: 'Strogonoff', valor: 'A partir de: R$ 35,00', imageSrc: '/assets/strogonoff.png', desc: 'Acompanha arroz, strogonoff de carne ou frango, champignon e batata palha.' },
  { nome: 'Filé de Frango Grelhado', valor: 'A partir de: R$ 32,00', imageSrc: '/assets/file_de_frango_grelhado.png', desc: 'Acompanha arroz, feijão, filé de frango, farofa ou batata frita.' },
  { nome: 'Filé de Frango à Milanesa', valor: 'A partir de: R$ 35,00', imageSrc: '/assets/file_de_frango_a_milanesa.png', desc: 'Acompanha arroz, feijão, frango à milanesa e batata frita.' },
  { nome: 'Carne Assada c/ Molho Madeira', valor: 'A partir de: R$ 35,00', imageSrc: '/assets/carne_assada_C_molho_madeira.png', desc: 'Acompanha arroz, carne bovina assada ao molho madeira.' },
  { nome: 'X-Salada', valor: 'A partir de: R$ 12,00', imageSrc: '/assets/x_salada.png', desc: 'O Sanduíche acompanha carne bovina, queijo, alface, tomate, cebola e maionese.' },
  { nome: 'X-Churrasco', valor: 'A partir de: R$ 12,00', imageSrc: '/assets/x-churrasco.png', desc: 'O Sanduíche acompanha queijo, vinagrete e churrasco.' },
  { nome: 'X-Tudo', valor: 'A partir de: R$ 12,00', imageSrc: '/assets/x_tudo.png', desc: 'O Sanduíche acompanha carne bovina, queijo, alface, tomate, cebola, ovo e maionese.' },
  { nome: 'Americano', valor: 'A partir de: R$ 12,00', imageSrc: '/assets/americano.png', desc: 'O Sanduíche acompanha pão francês, presunto, queijo, alface, tomate e ovo.' },
  { nome: 'X-Bacon', valor: 'A partir de: R$ 12,00', imageSrc: '/assets/x-bacon.png', desc: 'O Sanduíche acompanha carne bovina, queijo cheddar, cebola e bacon.' },
  { nome: 'Misto-Quente', valor: 'A partir de: R$ 8,00', imageSrc: '/assets/misto-quente.png', desc: 'O Sanduíche acompanha pão francês, presunto e queijo.' },
  { nome: 'X-Filé de Frango', valor: 'A partir de: R$ 12,00', imageSrc: '/assets/x-frango.png', desc: 'O Sanduíche acompanha filé de frango, salada, tomate e cebola.' },
  { nome: 'Queijo Quente', valor: 'A partir de: R$ 12,00', imageSrc: '/assets/queijo-quente.png', desc: 'O Sanduíche acompanha pão francês e queijo.' },
  { nome: 'Beirute', valor: 'A partir de: R$ 12,00', imageSrc: '/assets/beirute.png', desc: 'Acompanha alface, tomate, carne bovina ou filé de frango, maionese, queijo, cebola e batata frita.' },
  { nome: 'Suco de Limão', valor: 'A partir de: R$ 9,00', imageSrc: '/assets/suco_de_limao.png', desc: 'Suco natural de limão.' },
  { nome: 'Água', valor: 'A partir de: R$ 2,00', imageSrc: '/assets/agua.png', desc: 'Água mineral.' },
  { nome: 'Suco Del Valle', valor: 'A partir de: R$ 5,00', imageSrc: '/assets/suco_del_valle.png', desc: 'Suco de caixinha Del Valle.' },
  { nome: 'Refrigerante - Lata', valor: 'A partir de: R$ 5,00', imageSrc: '/assets/refrigerante_lata.png', desc: 'Refrigerante em lata 350ml.' },
  { nome: 'Refrigerante - Garrafa 2L', valor: 'A partir de: R$ 12,00', imageSrc: '/assets/refrigerante_2l.png', desc: 'Refrigerante garrafa 2 litros.' },
  { nome: 'Refrigerante - Garrafa 600ml', valor: 'A partir de: R$ 8,00', imageSrc: '/assets/refrigerante_600ml.png', desc: 'Refrigerante garrafa 600ml.' },
  { nome: 'Cerveja - Lata', valor: 'A partir de: R$ 6,00', imageSrc: '/assets/cerveja_lata.png', desc: 'Cerveja em lata 350ml.' },
  { nome: 'Cerveja - Garrafa 1L', valor: 'A partir de: R$ 14,00', imageSrc: '/assets/cerveja_1l.png', desc: 'Cerveja garrafa 1 litro.' },
  { nome: 'Cerveja - Garrafa 600ml', valor: 'A partir de: R$ 14,00', imageSrc: '/assets/cerveja_600ml.png', desc: 'Cerveja garrafa 600ml.' },
  { nome: 'Suco de Laranja', valor: 'A partir de: R$ 9,00', imageSrc: '/assets/suco_de_laranja.png', desc: 'Suco natural de laranja.' },
  { nome: 'Suco de Maracujá', valor: 'A partir de: R$ 9,00', imageSrc: '/assets/suco_de_maracuja.png', desc: 'Suco natural de maracujá.' },
  { nome: 'Suco de Abacaxi', valor: 'A partir de: R$ 9,00', imageSrc: '/assets/suco_de_abacaxi.png', desc: 'Suco natural de abacaxi.' },
  { nome: 'Caipirinha', valor: 'A partir de: R$ 17,00', imageSrc: '/assets/caipirinha.png', desc: 'Caipirinha de limão ou morango.' },
  { nome: 'Cachaça', valor: 'A partir de: R$ 5,00', imageSrc: '/assets/cachaça.png', desc: 'Dose de cachaça.' },
  { nome: 'Whisky', valor: 'A partir de: R$ 12,00', imageSrc: '/assets/whisky.png', desc: 'Dose de whisky.' }
];

// Função inteligente para classificar o produto
function definirCategoria(nome) {
  const n = nome.toLowerCase();
  
  if (n.includes('virado') || n.includes('feijoada') || n.includes('rolê') || n.includes('macarrão') || n.includes('peixe')) {
    return 'PRATOS_DO_DIA';
  }
  if (n.includes('picanha') || n.includes('mignon') || n.includes('contra filé') || n.includes('parmegiana') || n.includes('strogonoff') || n.includes('grelhado') || n.includes('frango à milanesa') || n.includes('madeira')) {
    return 'PRATOS_ESPECIAIS';
  }
  if (n.includes('omelete') || n.includes('picadinho') || n.includes('fígado') || n.includes('bife à milanesa') || n.includes('cavalo') || n.includes('passarinho')) {
    return 'PRATOS_EXECUTIVOS';
  }
  if (n.includes('x-') || n.includes('americano') || n.includes('misto') || n.includes('queijo') || n.includes('beirute')) {
    return 'HAMBURGUERES_BEIRUTES';
  }
  return 'BEBIDAS'; // Se não cair em nenhum acima, é bebida
}

async function seedDatabase() {
  console.log("1. Tentando fazer login como administrador...");
  let token = "";

  try {
    const loginRes = await axios.post('http://localhost:8080/auth/login', {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    });
    token = loginRes.data.token;
    console.log("✅ Login efetuado com sucesso!");
  } catch (err) {
    console.error("❌ Falha no login.");
    return;
  }

  console.log("\n2. Iniciando a carga de produtos...");

  for (const dish of dishes) {
    const form = new FormData();
    form.append('name', dish.nome);
    form.append('description', dish.desc || '');
    form.append('available', 'true');

    const priceMatch = dish.valor.match(/\d+,\d+/);
    const price = priceMatch ? parseFloat(priceMatch[0].replace(',', '.')) : 0;
    form.append('price', price.toString());

    // Usa a nossa função para pegar a categoria exata!
    form.append('category', definirCategoria(dish.nome));

    const imagePath = `./public${dish.imageSrc}`;
    if (fs.existsSync(imagePath)) {
      form.append('image', fs.createReadStream(imagePath));
    } else {
      console.warn(`⚠️ Imagem não encontrada para: ${dish.nome} (${imagePath})`);
    }

    try {
      await axios.post('http://localhost:8081/products', form, {
        headers: {
          ...form.getHeaders(),
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(`✅ Categoria [${definirCategoria(dish.nome)}] -> ${dish.nome}`);
    } catch (err) {
      console.error(`❌ Erro ao adicionar ${dish.nome}:`, err.response?.data || err.message);
    }
  }
  console.log("\n🎉 Carga finalizada com sucesso!");
}

seedDatabase();