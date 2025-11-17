# 🔥 TUTORIAL DE INTEGRAÇÃO COM FIREBASE - RK BARBEARIA

Este tutorial te guiará através do processo de configuração do Firebase para o site da RK Barbearia.

## 📋 Pré-requisitos

- Conta Google
- Projeto RK Barbearia já criado
- Conhecimento básico de JavaScript

## 🚀 Passo 1: Configuração do Projeto Firebase

### 1.1 Criar Projeto no Firebase Console

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto"
3. Nome do projeto: `RK-Barbearia`
4. Configure o Google Analytics (opcional, mas recomendado)
5. Clique em "Criar projeto"

### 1.2 Configurar Aplicativo Web

1. No painel do projeto, clique no ícone `</>`
2. Nome do app: `RK Barbearia Web`
3. Marque "Configure Firebase Hosting"
4. Clique em "Registrar app"

## 🔧 Passo 2: Configuração dos Serviços

### 2.1 Authentication (Autenticação)

1. No menu lateral, clique em "Authentication"
2. Clique em "Começar"
3. Vá para a aba "Sign-in method"
4. Habilite os seguintes provedores:
   - **Email/Password**: Para login com email
   - **Google**: Para login social (opcional)

### 2.2 Firestore Database

1. No menu lateral, clique em "Firestore Database"
2. Clique em "Criar banco de dados"
3. Modo: "Iniciar no modo de teste" (para desenvolvimento)
4. Localização: "southamerica-east1 (São Paulo)"
5. Clique em "Concluído"

### 2.3 Storage

1. No menu lateral, clique em "Storage"
2. Clique em "Começar"
3. Modo: "Iniciar no modo de teste"
4. Localização: "southamerica-east1 (São Paulo)"

## 📁 Passo 3: Estrutura do Banco de Dados

### 3.1 Coleções do Firestore

Crie as seguintes coleções na sua base de dados:

#### Coleção: `users`
```javascript
// Documento de usuário
{
  uid: "user_id_auto_generated",
  name: "João Silva",
  email: "joao@email.com",
  userType: "cliente", // ou "barbeiro"
  createdAt: timestamp,
  phone: "+5511999999999",
  avatar: "url_da_foto_opcional"
}
```

#### Coleção: `posts`
```javascript
// Documento de post
{
  id: "post_id_auto_generated",
  barberId: "barbeiro_user_id",
  barberName: "João Silva",
  description: "Corte degradê finalizado",
  hashtags: ["#degrade", "#cortemasculino"],
  imageUrl: "url_da_imagem_no_storage",
  likes: 25,
  likedBy: ["user_id_1", "user_id_2"],
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### Coleção: `bookings`
```javascript
// Documento de agendamento
{
  id: "booking_id_auto_generated",
  clientId: "cliente_user_id",
  clientName: "Maria Silva",
  barberId: "barbeiro_user_id",
  barberName: "João Silva",
  date: "2024-02-15",
  time: "14:00",
  service: "Corte + Barba",
  price: 35.00,
  status: "scheduled", // "scheduled", "completed", "cancelled"
  paymentMethod: "pix", // "pix", "credit", "debit"
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### Coleção: `complaints`
```javascript
// Documento de reclamação
{
  id: "complaint_id_auto_generated",
  userId: "user_id",
  userName: "Cliente Nome",
  message: "Texto da reclamação",
  status: "pending", // "pending", "resolved", "closed"
  createdAt: timestamp,
  resolvedAt: timestamp
}
```

## 🔑 Passo 4: Configuração do Código

### 4.1 Adicionar SDK do Firebase

Adicione estas linhas no `<head>` do seu `index.html`:

```html
<!-- Firebase SDK v9 (modular) -->
<script type="module">
  import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
  import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
  import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';
  import { getStorage } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js';
</script>
```

### 4.2 Configuração Firebase

Crie um arquivo `firebase-config.js`:

```javascript
// firebase-config.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js';

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "rk-barbearia.firebaseapp.com",
  projectId: "rk-barbearia",
  storageBucket: "rk-barbearia.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

**⚠️ IMPORTANTE**: Substitua os valores de configuração pelos dados do seu projeto Firebase.

### 4.3 Funções de Autenticação

Crie um arquivo `firebase-auth.js`:

```javascript
// firebase-auth.js
import { auth, db } from './firebase-config.js';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
import { doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

// Cadastrar novo usuário
export async function registerUser(email, password, name, userType = 'cliente') {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Enviar email de verificação
    await sendEmailVerification(user);
    
    // Salvar dados do usuário no Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      name: name,
      email: email,
      userType: userType,
      createdAt: new Date(),
      emailVerified: false
    });
    
    return { success: true, user: user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Fazer login
export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Buscar dados do usuário no Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData = userDoc.data();
    
    return { success: true, user: user, userData: userData };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Fazer logout
export async function logoutUser() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Monitorar estado de autenticação
export function observeAuthState(callback) {
  return onAuthStateChanged(auth, callback);
}
```

### 4.4 Funções do Firestore

Crie um arquivo `firebase-firestore.js`:

```javascript
// firebase-firestore.js
import { db } from './firebase-config.js';
import { 
  collection, 
  doc, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  limit,
  where,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

// Buscar posts
export async function getPosts(limitNumber = 10) {
  try {
    const q = query(
      collection(db, 'posts'), 
      orderBy('createdAt', 'desc'), 
      limit(limitNumber)
    );
    const querySnapshot = await getDocs(q);
    const posts = [];
    
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, posts: posts };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Criar novo post (apenas barbeiros)
export async function createPost(postData) {
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      ...postData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Curtir/descurtir post
export async function toggleLike(postId, userId, isLiked) {
  try {
    const postRef = doc(db, 'posts', postId);
    
    if (isLiked) {
      // Remover like
      await updateDoc(postRef, {
        likes: increment(-1),
        likedBy: arrayRemove(userId)
      });
    } else {
      // Adicionar like
      await updateDoc(postRef, {
        likes: increment(1),
        likedBy: arrayUnion(userId)
      });
    }
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Criar agendamento
export async function createBooking(bookingData) {
  try {
    const docRef = await addDoc(collection(db, 'bookings'), {
      ...bookingData,
      status: 'scheduled',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Buscar agendamentos do usuário
export async function getUserBookings(userId) {
  try {
    const q = query(
      collection(db, 'bookings'),
      where('clientId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const bookings = [];
    
    querySnapshot.forEach((doc) => {
      bookings.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, bookings: bookings };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Cancelar agendamento
export async function cancelBooking(bookingId) {
  try {
    const bookingRef = doc(db, 'bookings', bookingId);
    await updateDoc(bookingRef, {
      status: 'cancelled',
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

## 🖼️ Passo 5: Upload de Imagens

### 5.1 Configurar Storage

Crie um arquivo `firebase-storage.js`:

```javascript
// firebase-storage.js
import { storage } from './firebase-config.js';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL,
  deleteObject 
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js';

// Upload de imagem de corte
export async function uploadHaircutImage(file, postId) {
  try {
    const imageRef = ref(storage, `haircuts/${postId}/${file.name}`);
    const snapshot = await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return { success: true, url: downloadURL };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Upload de avatar do usuário
export async function uploadUserAvatar(file, userId) {
  try {
    const avatarRef = ref(storage, `avatars/${userId}/${file.name}`);
    const snapshot = await uploadBytes(avatarRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return { success: true, url: downloadURL };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Deletar imagem
export async function deleteImage(imageUrl) {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

## 🔒 Passo 6: Regras de Segurança

### 6.1 Firestore Security Rules

No Firebase Console, vá para "Firestore Database" > "Regras" e configure:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Regras para usuários
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null; // Permitir leitura para buscar barbeiros
    }
    
    // Regras para posts
    match /posts/{postId} {
      allow read: if request.auth != null;
      allow create, update: if request.auth != null 
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.userType == 'barbeiro';
      allow delete: if request.auth != null 
        && resource.data.barberId == request.auth.uid;
    }
    
    // Regras para agendamentos
    match /bookings/{bookingId} {
      allow read, write: if request.auth != null 
        && (resource.data.clientId == request.auth.uid || resource.data.barberId == request.auth.uid);
      allow create: if request.auth != null;
    }
    
    // Regras para reclamações
    match /complaints/{complaintId} {
      allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null;
    }
  }
}
```

### 6.2 Storage Security Rules

No Firebase Console, vá para "Storage" > "Regras" e configure:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Regras para imagens de cortes
    match /haircuts/{postId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null 
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.userType == 'barbeiro';
    }
    
    // Regras para avatars
    match /avatars/{userId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🚀 Passo 7: Implementação no Site

### 7.1 Modificar o arquivo script.js

Adicione as importações no início do arquivo:

```javascript
// Importações do Firebase (adicionar no topo do script.js)
import { registerUser, loginUser, logoutUser, observeAuthState } from './firebase-auth.js';
import { getPosts, createPost, toggleLike, createBooking, getUserBookings } from './firebase-firestore.js';
import { uploadHaircutImage } from './firebase-storage.js';
```

### 7.2 Substituir funções demo pelas reais

```javascript
// Substituir a função handleLogin por:
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const result = await loginUser(email, password);
    
    if (result.success) {
        AppState.isLoggedIn = true;
        AppState.currentUser = result.userData;
        AppState.userType = result.userData.userType;
        
        // Update UI
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('feedContainer').style.display = 'block';
        
        // Load real posts from Firebase
        await loadPostsFromFirebase();
        
        hideLoginModal();
        showSuccessMessage(`Bem-vindo, ${result.userData.name}!`);
    } else {
        showErrorMessage('Email ou senha incorretos!');
    }
}

// Nova função para carregar posts do Firebase
async function loadPostsFromFirebase() {
    const result = await getPosts(20);
    if (result.success) {
        AppState.posts = result.posts;
        displayPosts(AppState.posts);
    }
}
```

## 🌐 Passo 8: Deploy (Opcional)

### 8.1 Firebase Hosting

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Fazer login
firebase login

# Inicializar hosting
firebase init hosting

# Deploy
firebase deploy
```

## 📋 Checklist de Configuração

- [ ] Projeto criado no Firebase Console
- [ ] Authentication configurado (Email/Password)
- [ ] Firestore Database criado
- [ ] Storage configurado
- [ ] Regras de segurança aplicadas
- [ ] SDK do Firebase adicionado ao HTML
- [ ] Arquivos de configuração criados
- [ ] Funções do site integradas com Firebase
- [ ] Teste de autenticação funcionando
- [ ] Teste de posts funcionando
- [ ] Teste de agendamentos funcionando

## 🆘 Solução de Problemas

### Erro: "Firebase is not defined"
- Verifique se os scripts do Firebase foram carregados corretamente
- Certifique-se de usar imports ES6 corretamente

### Erro: "Permission denied"
- Verifique as regras de segurança do Firestore e Storage
- Confirme se o usuário está autenticado

### Erro: "Configuration not found"
- Verifique se a configuração do Firebase está correta
- Confirme se o arquivo firebase-config.js está sendo importado

## 📞 Suporte

Para dúvidas ou problemas:
1. Consulte a [documentação oficial do Firebase](https://firebase.google.com/docs)
2. Verifique o console do navegador para erros
3. Teste as regras de segurança no simulador do Firebase Console

---

**🎉 Parabéns!** Seu site da RK Barbearia agora está integrado com o Firebase e pronto para uso em produção!