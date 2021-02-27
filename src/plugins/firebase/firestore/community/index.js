import Firebase from 'firebase/app';

export function getQuestionCommunityReference() {
  return Firebase.firestore()
    .collection('COMMUNITY')
    .doc('6zh2VISAhIJnRTBTm2iY')
    .collection('QUESTION');
}

export function getInformationCommunityReference() {
  return Firebase.firestore()
    .collection('COMMUNITY')
    .doc('3Cgg1Dgk1skk1FcD1JHq')
    .collection('INFORMATION');
}

export function getSubCollectionReference(reference, documentID, collection) {
  return reference.doc(documentID).collection(collection);
}

export function createPost(reference, post) {
  return new Promise((resolve, reject) => {
    reference.add(post)
      .then((documentReference) => {
        resolve(documentReference);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function readPosts(reference, count = Number, snapshot = {}) {
  return new Promise((resolve, reject) => {
    reference.orderBy('created_at', 'desc').startAfter(snapshot).limit(count).get()
      .then((querySnapshot) => {
        resolve(querySnapshot);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function readPost(reference, documentID) {
  return new Promise((resolve, reject) => {
    reference.doc(documentID).get()
      .then((snapshot) => {
        if (!snapshot.exists) {
          const error = 'no such document';
          reject(error);
        }
        const post = {};
        post.id = snapshot.id;
        post.header = snapshot.data().header;
        post.body = snapshot.data().body;
        post.createdAt = snapshot.data().created_at;
        resolve(post);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
