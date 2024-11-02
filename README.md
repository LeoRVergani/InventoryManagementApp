---

# 📦 Projeto de Gestão de Estoque e Movimentação de Produtos

Este projeto consiste em um aplicativo de gerenciamento de estoque e movimentações para uma farmácia. Criado com **React Native** e **TypeScript**, ele oferece uma interface intuitiva para cadastro e consulta de usuários, produtos e movimentações de estoque entre filiais.

## 💡 Funcionalidades Principais

1. **Login de Usuário**:
   - Tela de login para autenticação do usuário.
   - Armazenamento seguro de dados de sessão.

2. **Tela Home**:
   - Navegação para gestão de produtos e usuários.
   - Exibição do perfil e nome do usuário.

3. **Gestão de Usuários**:
   - Listagem de usuários com ativação/desativação de status.
   - Cadastro de novos usuários com campos de perfil, nome, CPF/CNPJ, endereço, e-mail e senha.

4. **Gestão de Produtos**:
   - Listagem de produtos com filtro por nome e filial.
   - Exibição de informações detalhadas de cada produto, como imagem, nome, quantidade e filial.

5. **Movimentação de Estoque**:
   - Cadastro de movimentações com seleção de filial de origem, destino e produto.
   - Validação de quantidade disponível no estoque.
   - Listagem de movimentações com origem, destino e status.

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React Native, TypeScript, Lottie para animações, Axios para chamadas de API
- **Backend**: Node.js, Express
- **Banco de Dados**: SQLite (com persistência local para dados de teste)
- **Outras Ferramentas**: Expo, Git, GitHub para versionamento

## 🔧 Instalação e Configuração

1. Clone este repositório:
   ```bash
   git clone https://github.com/LeoRVergani/projeto_modulo_1.git
   cd projeto_modulo_1
   ```

2. Instale as dependências do projeto:
   ```bash
   npm install
   ```

3. Inicie o backend (API local):
   ```bash
   node backend.js
   ```

4. Inicie o Expo para executar o aplicativo mobile:
   ```bash
   expo start
   ```

## 📱 Uso do App

1. **Login**: Use as credenciais predefinidas (exemplo: admin/admin).
2. **Home**: Selecione a seção de produtos ou usuários.
3. **Gestão de Usuários**: Consulte e ative/desative usuários, ou cadastre novos usuários.
4. **Gestão de Produtos**: Visualize produtos e busque por nome/filial.
5. **Movimentação de Estoque**: Realize cadastro de movimentações e confira a listagem com origem, destino e status.

---

## 🚀 Contribuindo

1. Faça um fork do projeto.
2. Crie uma branch com sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça commit das suas alterações:
   ```bash
   git commit -m "feat: Minha nova feature"
   ```
4. Faça o push para a sua branch:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request.

## 📄 Licença

Este projeto está sob a licença MIT. 

---
