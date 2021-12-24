import axios from "axios";

export const api = axios.create({
  baseURL: "http://54.226.57.233:8080",
});

const users = [
  {
    id: 'user1', password: 'pass1', token: 'test1', name: 'John Doe',
    keywords: ['react', 'redux', 'node.js']
  },
  {
    id: 'user2', password: 'pass2', token: 'test2', name: 'Jane Doe',
    keywords: ['jquery', 'css', 'html']
  },
  {
    id: 'user3', password: 'pass3', token: 'test3', name: 'Jake Doe',
    keywords: ['android', 'potter', 'voldemort']
  },
];

export const auth = ({ username, password }) => new Promise(resolve => {
    setTimeout(() => {
      const user = username && password && users.find( o =>
        o.id === username && o.password === password
      );
      if (user)
        resolve( {ok: true, token: user.token} );
      else
        resolve( {ok: false, message: 'Wrong username or password'} );
    }, 1000);
});

export const fetchProfile = token => new Promise(resolve => {
    setTimeout(() => {
      const user = token && users.find( o => o.token === token );
      if (user) {
        const {name, keywords} = user;
        resolve( { ok: true, data: {name, keywords} } );
      }
      else {
        resolve( {ok: false} );
      }
    }, 1000);
});

export const userSignUp = async(id, pw, username) => {
  try {
    const response = await api.post("/api/sign-up",
      {
        email: id,
        password: pw,
        name: username
      }
    );
    console.log(response.data);
  }
  catch(e) {
    console.log(e);
  }
}

export const userSignIn = async(id, pw) => {
  try {
    const response = await api.post("/api/sign-in",
      {
        email: id,
        password: pw
      }
    );
    console.log(response.data);
  } 
  catch(e) {
    console.log(e);
  }
}

export async function syncBookmark(data) {
  data.forEach(async (tab)=> {
    try {
      await api.post("/api/memberbookmark", 
        {
          title: tab.title,
          link: tab.url,
          header: tab.title
        }
      )
    } catch(e) {
      console.log(e);
    }
  })
}

export async function registerBookmark(pageTitle) {
  
  let queryOptions = {active: true, currentWindow: true};
  
  chrome.tabs.query(queryOptions, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.log(url);
    console.log(tab.title)

    try {
      await api.post("/api/bookmark",
        {
          title: pageTitle,
          link: url,
          header: tab.title
        }
      )
    } catch(e) {
      console.log(e);
    }

    
  })
  
}

export function getCurrentTabUrl(callback) {
  var queryInfo= {
    active: true,
    currentWindow: true
  };
  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    callback(url);
  })
}

export function renderURL(statusText) {
  document.getElementById('url').textContent=statusText;
}