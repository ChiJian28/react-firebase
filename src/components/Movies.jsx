import { db, auth } from '../config/firebase';
import { useState, useEffect } from 'react';
import { getDocs, collection, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';

const Movies = () => {

    //displaying data used
    const [movieList, setMovieList] = useState([]); 
    
    // reference to the collection
    const moviesCollectionRef = collection(db, "movies");       //the name of collection must equal to your database collection's name
    
    // function to query/read our database
    const getMovieList = async () => {
        // READ THE DATA
        // SET THE MOVIE LIST
        try {
            const data = await getDocs(moviesCollectionRef);     //return a promise
            const filteredData = data.docs.map((doc) => (        //grab directlty the data we want
            {...doc.data(), id: doc.id}
            ))       
            // console.log(filteredData);
            setMovieList(filteredData);
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        getMovieList(); 
    }, []);



    // CRUD used
    const [newMovieTitle, setNewMovieTitle] = useState('');
    const [newReleaseDate, setNewReleaseDate] = useState(0);
    const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState('');

    // create a new movie
    const onSubmitMovie = async () => {
        try {
            await addDoc(moviesCollectionRef, {         // id will be automatically generated when you add the document
                title: newMovieTitle, 
                releaseDate: newReleaseDate, 
                receivedAnOscar: isNewMovieOscar,
                userId: auth?.currentUser?.uid,
            });
            alert("Added a new movie");
            getMovieList(); 
        } catch (error) {
            console.error(error);
        }
    };

    // delete
    const deleteMovie = async (id) => {
        try {
            const movieDoc = doc(db, "movies", id);
            await deleteDoc(movieDoc);
            alert("Deleted successfully");
            getMovieList(); 
        } catch (error) {
            console.error(error);
        }
    };

    // update
    const updateMovieTitle = async (id) => {
        try {
            const movieDoc = doc(db, "movies", id);
            await updateDoc(movieDoc, {
                title: updatedTitle
            });
            alert("Updated successfully");
            getMovieList(); 
        } catch (error) {
            console.error(error);
        }
    };

  return (
    <div className='h-screen'>
        {/* creating data */}
        <div className="flex flex-col items-center justify-center"> 
            <h1 className='mb-24 text-6xl text-indigo-500'>CRUD Example</h1>
            <input 
                type="text" 
                placeholder='Movie title...' 
                className="w-64 p-2 mb-5 rounded border"
                onChange={(e) => {setNewMovieTitle(e.target.value)}}
            />
            <input 
                className="w-64 p-2 mb-5 rounded border"
                type="number" 
                placeholder='Release Date'
                onChange={(e) => {setNewReleaseDate(e.target.value)}}
            />
            <span className='justify-between flex w-[170px] mb-5'>
                <input 
                    type="checkbox" 
                    checked={isNewMovieOscar}      // checkbox property
                    onChange={(e) => {setIsNewMovieOscar(e.target.checked)}}
                />
                <label>Received an Oscar</label>
            </span>
            <button onClick={onSubmitMovie} className="w-64 mb-12 p-2 bg-orange-500 text-white rounded">Submit Movie</button>
        </div>
        {/* displaying data from database */}
        <div className="flex flex-wrap justify-center">
            {movieList.map((movie) => (
                <div key={movie.id} className='flex mx-4 flex-col w-[300px] mb-4 border-8 border-blue-200 rounded-md p-4'>
                    <h1 className='text-3xl' style={{ color: movie.receivedAnOscar ? 'green' : 'red' }}>{movie.title}</h1>
                    <p className='text-2xl'>Date: {movie.releaseDate}</p>
                    
                    <button className='w-64 mt-4 p-2 bg-red-800 text-white rounded' onClick={() => { deleteMovie(movie.id) }}>Delete Movie</button>

                    <input className="w-64 mt-4 p-2 rounded border" type="text" placeholder='New title...' onChange={(e) => {setUpdatedTitle(e.target.value)}} />
                    <button className='w-64 mt-4 p-2 bg-blue-800 text-white rounded' onClick={() => {updateMovieTitle(movie.id)}}>Update Title</button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Movies