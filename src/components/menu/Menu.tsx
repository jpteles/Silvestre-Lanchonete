interface menuProps {
  nome: string
  nameSection: string | null
  id: number
  valor: string
  imageSrc: string
  desc?: string
}

export const dishes: menuProps[] = [
  { nome: 'Virado à Paulista - Segunda-feira', nameSection: 'Pratos do dia', id: 1, valor: 'A partir de: R$ 24,90', imageSrc: '/assets/Virado_a_Paulista_1.jpg', desc: 'Acompanha arroz soltinho, feijão, couve, farofa, ovos e suculenta linguiça grelhada.' },
  { nome: 'Bife à rolê - Terça-feira', nameSection: null, id: 2, valor: 'A partir de: R$ 24,90', imageSrc: '/assets/bife_a_role.jpg', desc: 'Acompanha arroz soltinho, feijão e bife à rolê.' },
  { nome: 'Feijoada - Quarta-feira e Sábado', nameSection: null, id: 3, valor: 'A partir de: R$ 24,90', imageSrc: '/assets/feijoada.jpg', desc: 'Acompanha arroz soltinho, feijoada, couve, farofa, torresmo e bisteca.' },
  { nome: 'Macarrão com frango - Quinta-feira', nameSection: null, id: 4, valor: 'A partir de: R$ 24,90', imageSrc: '/assets/macarronada-coxa-sobrecoxa-frango 1.jpg', desc: 'Acompanha Macarrão ao molho e frango cozido.' },
  { nome: 'Filé de peixe - Sexta-feira', nameSection: null, id: 5, valor: 'A partir de: R$ 24,90', imageSrc: '/assets/file_de_peixe.jpg', desc: 'Acompanha arroz, feijão, filé de peixe empanado, batata frita e purê.' },
  { nome: 'Omelete', nameSection: 'Pratos executivos', id: 7, valor: 'A partir de: R$ 24,90', imageSrc: '/assets/omelete.jpg', desc: 'Acompanha omelete, arroz e feijão.' },
  { nome: 'Picadinho', nameSection: null, id: 8, valor: 'A partir de: R$ 24,90', imageSrc: '/assets/picadinho.jpg', desc: 'Acompanha arroz, feijão e picadinho de carne.' },
  { nome: 'Fígado Acebolado', nameSection: null, id: 9, valor: 'A partir de: R$ 24,90', imageSrc: '/assets/figado_acebolado.jpg', desc: 'Acompanha arroz, feijão e fígado acebolado.' },
  { nome: 'Bife à Milanesa', nameSection: null, id: 14, valor: 'A partir de: R$ 24,90', imageSrc: '/assets/bife_a_milanesa.jpg', desc: 'Acompanha arroz, feijão, bife à milanesa e batata frita.' },
  { nome: 'Bife à Cavalo', nameSection: null, id: 15, valor: 'A partir de: R$ 24,90', imageSrc: '/assets/bife_a_cavalo.jpg', desc: 'Acompanha arroz, feijão, bife à cavalo e batata frita.' },
  { nome: 'Frango à Passarinho', nameSection: null, id: 16, valor: 'A partir de: R$ 24,90', imageSrc: '/assets/frango_a_passarinho.jpg', desc: 'Acompanha arroz, feijão e frango à passarinho.' },
  { nome: 'Picanha', nameSection: 'Pratos especiais', id: 17, valor: 'A partir de: R$ 35,00', imageSrc: '/assets/picanha.jpg', desc: 'Acompanha picanha assada, feijão, arroz, farofa e vinagrete.' },
  { nome: 'Filé Mignon', nameSection: null, id: 18, valor: 'A partir de: R$ 32,00', imageSrc: '/assets/file_mignon.jpg', desc: 'Acompanha arroz, feijão, filé mignon e purê de batata.' },
  { nome: 'Contra Filé', nameSection: null, id: 19, valor: 'A partir de: R$ 32,00', imageSrc: '/assets/contra_file.jpg', desc: 'Acompanha arroz, feijão, contra filé e batata frita.' },
  { nome: 'Parmegiana', nameSection: null, id: 20, valor: 'A partir de: R$ 35,00', imageSrc: '/assets/parmegiana.jpg', desc: 'Acompanha arroz, a parmegiana de carne ou frango e batata frita.' },
  { nome: 'Strogonoff', nameSection: null, id: 21, valor: 'A partir de: R$ 35,00', imageSrc: '/assets/strogonoff.png', desc: 'Acompanha arroz, strogonoff de carne ou frango, champignon e batata palha.' },
  { nome: 'Filé de Frango Grelhado', nameSection: null, id: 22, valor: 'A partir de: R$ 32,00', imageSrc: '/assets/file_de_frango_grelhado.png', desc: 'Acompanha arroz, feijão, filé de frango, farofa ou batata frita.' },
  { nome: 'Filé de Frango à Milanesa', nameSection: null, id: 23, valor: 'A partir de: R$ 35,00', imageSrc: '/assets/file_de_frango_a_milanesa.png', desc: 'Acompanha arroz, feijão, frango à milanesa e batata frita.' },
  { nome: 'Carne Assada c/ Molho Madeira', nameSection: null, id: 24, valor: 'A partir de: R$ 35,00', imageSrc: '/assets/carne_assada_C_molho_madeira.png', desc: 'Acompanha arroz, carne bovina assada ao molho madeira.' },
  { nome: 'X-Salada', nameSection: 'Hambúrgueres & Beirutes', id: 25, valor: 'A partir de: R$ 12,00', imageSrc: '/assets/x_salada.png', desc: 'O Sanduíche acompanha carne bovina, queijo, alface, tomate, cebola e maionese.' },
  { nome: 'X-Churrasco', nameSection: null, id: 29, valor: 'A partir de: R$ 12,00', imageSrc: '/assets/x-churrasco.png', desc: 'O Sanduíche acompanha queijo, vinagrete e churrasco.' },
  { nome: 'X-Tudo', nameSection: null, id: 26, valor: 'A partir de: R$ 12,00', imageSrc: '/assets/x_tudo.png', desc: 'O Sanduíche acompanha carne bovina, queijo, alface, tomate, cebola, ovo e maionese.' },
  { nome: 'Americano', nameSection: null, id: 30, valor: 'A partir de: R$ 12,00', imageSrc: '/assets/americano.png', desc: 'O Sanduíche acompanha pão francês, presunto, queijo, alface, tomate e ovo.' },
  { nome: 'X-Bacon', nameSection: null, id: 27, valor: 'A partir de: R$ 12,00', imageSrc: '/assets/x-bacon.png', desc: 'O Sanduíche acompanha carne bovina, queijo cheddar, cebola e bacon.' },
  { nome: 'Misto-Quente', nameSection: null, id: 31, valor: 'A partir de: R$ 8,00', imageSrc: '/assets/misto-quente.png', desc: 'O Sanduíche acompanha pão francês, presunto e queijo.' },
  { nome: 'X-Filé de Frango', nameSection: null, id: 28, valor: 'A partir de: R$ 12,00', imageSrc: '/assets/x-frango.png', desc: 'O Sanduíche acompanha filé de frango, salada, tomate e cebola.' },
  { nome: 'Queijo Quente', nameSection: null, id: 32, valor: 'A partir de: R$ 12,00', imageSrc: '/assets/queijo-quente.png', desc: 'O Sanduíche acompanha pão francês e queijo.' },
  { nome: 'Beirute', nameSection: null, id: 33, valor: 'A partir de: R$ 12,00', imageSrc: '/assets/beirute.png', desc: 'Acompanha alface, tomate, carne bovina ou filé de frango, maionese, queijo, cebola e batata frita.' },
  { nome: 'Suco de Limão', nameSection: 'Bebidas', id: 34, valor: 'A partir de: R$ 9,00', imageSrc: '/assets/suco_de_limao.png', desc: 'Suco natural de limão.' },
  { nome: 'Água', nameSection: null, id: 35, valor: 'A partir de: R$ 2,00', imageSrc: '/assets/agua.png', desc: 'Água mineral.' },
  { nome: 'Suco Del Valle', nameSection: null, id: 36, valor: 'A partir de: R$ 5,00', imageSrc: '/assets/suco_del_valle.png', desc: 'Suco de caixinha Del Valle.' },
  { nome: 'Refrigerante - Lata', nameSection: null, id: 37, valor: 'A partir de: R$ 5,00', imageSrc: '/assets/refrigerante_lata.png', desc: 'Refrigerante em lata 350ml.' },
  { nome: 'Refrigerante - Garrafa 2L', nameSection: null, id: 38, valor: 'A partir de: R$ 12,00', imageSrc: '/assets/refrigerante_2l.png', desc: 'Refrigerante garrafa 2 litros.' },
  { nome: 'Refrigerante - Garrafa 600ml', nameSection: null, id: 39, valor: 'A partir de: R$ 8,00', imageSrc: '/assets/refrigerante_600ml.png', desc: 'Refrigerante garrafa 600ml.' },
  { nome: 'Cerveja - Lata', nameSection: null, id: 40, valor: 'A partir de: R$ 6,00', imageSrc: '/assets/cerveja_lata.png', desc: 'Cerveja em lata 350ml.' },
  { nome: 'Cerveja - Garrafa 1L', nameSection: null, id: 41, valor: 'A partir de: R$ 14,00', imageSrc: '/assets/cerveja_1l.png', desc: 'Cerveja garrafa 1 litro.' },
  { nome: 'Cerveja - Garrafa 600ml', nameSection: null, id: 42, valor: 'A partir de: R$ 14,00', imageSrc: '/assets/cerveja_600ml.png', desc: 'Cerveja garrafa 600ml.' },
  { nome: 'Suco de Laranja', nameSection: null, id: 43, valor: 'A partir de: R$ 9,00', imageSrc: '/assets/suco_de_laranja.png', desc: 'Suco natural de laranja.' },
  { nome: 'Suco de Maracujá', nameSection: null, id: 44, valor: 'A partir de: R$ 9,00', imageSrc: '/assets/suco_de_maracuja.png', desc: 'Suco natural de maracujá.' },
  { nome: 'Suco de Abacaxi', nameSection: null, id: 45, valor: 'A partir de: R$ 9,00', imageSrc: '/assets/suco_de_abacaxi.png', desc: 'Suco natural de abacaxi.' },
  { nome: 'Caipirinha', nameSection: null, id: 46, valor: 'A partir de: R$ 17,00', imageSrc: '/assets/caipirinha.png', desc: 'Caipirinha de limão ou morango.' },
  { nome: 'Cachaça', nameSection: null, id: 47, valor: 'A partir de: R$ 5,00', imageSrc: '/assets/cachaça.png', desc: 'Dose de cachaça.' },
  { nome: 'Whisky', nameSection: null, id: 48, valor: 'A partir de: R$ 12,00', imageSrc: '/assets/whisky.png', desc: 'Dose de whisky.' },
]