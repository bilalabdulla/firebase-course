import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './components/Auth';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { auth, db, storage } from './config/firebase';
import { ref, uploadBytes } from 'firebase/storage';

function App() {
  const [movieList, setMovieList] = useState([])

  const [newMovieTitle, setNewMovieTitle] = useState('')
  const [newReleaseDate, setNewReleaseDate] = useState(0)
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false)

  const [updatedTitle, setUpdatedTitle] = useState('')
  const [fileUpload, setFileUpload] = useState(null)

  const movieCollectionRef = collection(db, 'movies')

  const onSubmitMovie = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        gotOscar: isNewMovieOscar,
        userId: auth.currentUser.uid
      })

    } catch (err) {
      console.error(err)
    }
  }

useEffect(() => {
  const getMovieList = async () => {
    try {
      const data = await getDocs(movieCollectionRef)
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      setMovieList(filteredData)
    } catch (err) {
      console.error(err)
    }
  }

     getMovieList()
  }, [onSubmitMovie])

 
  const deleteMovie = async (id) => {
    const movieDoc = doc(db, 'movies', id)
    await deleteDoc(movieDoc)
  }

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, 'movies', id)
    await updateDoc(movieDoc, { title: updatedTitle })
  }

  const uploadFile = async () => {
    if (!fileUpload) return 
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`) 
    try {
      await uploadBytes(filesFolderRef, fileUpload)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="App">
      <Auth />

      <div>
        <input 
        placeholder='movie title...'
        onChange={(e) => setNewMovieTitle(e.target.value)}/>
        <input 
        placeholder='release date...'
        type='number'
        onChange={(e) => setNewReleaseDate(Number(e.target.value))}/>
        <input 
        type='checkbox'
        checked = {isNewMovieOscar}
        onChange={(e) => setIsNewMovieOscar(e.target.checked)}
        />
        <label>Received an oscar</label>
        <button onClick={onSubmitMovie}>Submit movie</button>
      </div>

      <div>
        {
          movieList.map((movie) => {
           return <div>
              <h1> {movie.title} </h1>
              <p> {movie.releaseDate }</p>
              <button onClick={() => deleteMovie(movie.id)}>Delete movie</button>
              <input placeholder='new title' 
              onChange={(e) => setUpdatedTitle(e.target.value)}/>
              <button onClick={() => updateMovieTitle(movie.id)}>Update title</button>
            </div>
          })
        }
      </div>

      <div>
        <input type='file' 
        onChange={(e) => setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}>Upload file</button>
      </div>
    </div>
  );
}

export default App;
