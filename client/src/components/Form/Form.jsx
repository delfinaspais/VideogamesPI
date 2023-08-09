import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {postVideogame, getGenres} from '../../redux/actions'
import {useDispatch, useSelector} from 'react-redux'
import styles from './Form.module.css'

const validate = (input) => {
    let errors = {}
    if(!input.name){ errors.name = 'Must have a name' }
    if(!input.description){ errors.description = 'Must have a description' }
    if(!input.released){ errors.released = 'Must have a released date' }
    if(!input.rating){ errors.rating = 'Must have a rating number' }
    if(input.rating < 0 || input.rating > 5 || input.rating / input.rating !== 1){ errors.rating = 'Must be between 0 and 5 points' }
    if(!input.platforms){ errors.platforms = 'Must have a platform' }
    if(input.genres.length <= 0){ errors.genres = 'Must have a genre' }
    return errors
}


const Form = () => {
    
    const [input, setInput] = useState({
        name:"",
        description:"",
        released:"",
        background_image:"",
        rating:"",
        platforms:"",
        genres:[]
    })
    
    const [errors, setErrors] = useState({})

    const dispatch = useDispatch()
    
    let key = 0
    useEffect(() => { dispatch(getGenres()) }, [dispatch])

    const stategenres = useSelector((state) => state.genres)
    
    function handleChange(event){
        event.preventDefault()
        setInput({ ...input, [event.target.name] : event.target.value })

        setErrors(validate({ ...input, [event.target.name]: event.target.value })) // console.log(errors)
    }

    function handlePlatform(event){
        event.preventDefault()
        setInput({ ...input, platforms: input.platforms +  event.target.value + ' - ' })
        setErrors(validate({ ...input, platforms: input.platforms + event.target.value + ' - ' }))
    }

    function handleResetPlatform(event){
        event.preventDefault()
        setInput({ ...input, platforms: "" })
    }

    
     function handleGenres(event) {
        event.preventDefault();
        setInput((prevInput) => ({ ...prevInput, genres: [...prevInput.genres, event.target.value] }));
      }

    function handleResetGenres(event) {
         event.preventDefault()
         setInput({ ...input, genres: [] })
    }

    function handlePostVideogame(event){
        if(!errors.name && !errors.description && !errors.released && !errors.rating && !errors.platforms && !errors.genres ){
            event.preventDefault()
            if(input.name !== ''){
            event.preventDefault()
            dispatch(postVideogame(input))
            alert('Game created')
            setInput({
            name:"",
            description:"",
            released:"",
            background_image:"",
            rating:"",
            platforms:"",
            genres:[]
            })
            }
        }else{
            event.preventDefault()
            alert('Complete all the required fields')
        }
    }

    return (
        <div>

            <div className={styles.divbuttonhome}>
            <Link to='/home' >
                <button className={styles.buttonhome}>  Back Home </button>
            </Link>
            </div>

            <h1 className={styles.title}>Create your game</h1>
            
            <form onSubmit={event => handlePostVideogame(event)}>

                <div className={styles.container}>
                    <label className={styles.label} style={{marginRight: '3px', fontSize:'18px'}}>Name </label><input className={styles.input} placeholder='Creat name' onChange={handleChange} type='text' value={input.name} name='name'></input>
                    { errors.name && ( <p className={styles.errors} style={{marginRight:'20%'}}>{errors.name} </p> ) }
                </div>
                
                <div className={styles.container}>
                    <label className={styles.label} style={{ fontSize: '12px', marginRight: '3px'}}>Describe </label><input className={styles.input} style={{ height: '100px' }} placeholder='Create description' onChange={handleChange} type='text' value={input.description} name='description'></input>
                    { errors.description && ( <p className={styles.errors}>{errors.description} </p> ) }
                </div>

                <div className={styles.container}>
                    <label className={styles.label} style={{ fontSize: '17px', marginRight: '3px' }}>Released date </label><input className={styles.input} placeholder='01-01-01' onChange={handleChange} type='date' value={input.released} name='released'></input>
                    { errors.released && ( <p className={styles.errors}>{errors.released}</p> ) }
                </div>

                <div className={styles.container}>
                    <label className={styles.label} style={{marginRight:'3px'}}>Image </label><input className={styles.input} placeholder='Optional' onChange={handleChange} type='text' value={input.background_image} name='background_image'></input>
                </div>

                <div className={styles.container}>
                    <label className={styles.label} style={{marginRight:'3px'}}>Rating </label><input className={styles.input} placeholder='0 to 5' onChange={handleChange} type='text' value={input.rating} name='rating'></input>
                    { errors.rating && ( <p className={styles.errors}>{errors.rating}</p> ) }
                </div>

                <div className={styles.container}>
                    <label className={styles.label} style={{ marginLeft: '0%', marginRight:'3px' }} >Platforms </label>
                    <select className={styles.input} style={{width: '22%', height: '37px'}} onChange= {(e) => handlePlatform(e)}>
                        <option hidden>...</option> 
                        <option value='PC'>PC</option>
                        <option value='macOS'>macOS</option>
                        <option value='Linux'>Linux</option>
                        <option value='Xbox 360'>Xbox 360</option>
                        <option value='PlayStation 3'>PlayStation 3</option>
                        <option value='PlayStation 4'>PlayStation 4</option>
                        <option value='PlayStation 5'>PlayStation 5</option>
                        <option value='Android'>Android</option>
                        <option value='PS Vita'>PS Vita</option>
                        <option value='Xbox One'>Xbox One</option>
                        <option value='Nintendo Switch'>Nintendo Switch</option>
                        <option value='iOS'>iOS</option>
                        <option value='Xbox Series S/X'>Xbox Series S/X</option>
                    </select>
                    { errors.platforms && ( <p className={styles.errors}>{errors.platforms}</p> ) }

                    <button className={styles.buttonhome} onClick={(event) => handleResetPlatform(event)}>Clean Platforms</button>
                </div>
                
                <div className={styles.container}>
                    <label className={styles.label} style={{ marginLeft: '0%', marginRight:'3px' }}>Genres </label>

                    <select className={styles.input} style={{width: '25%', height: '37px'}} onChange={(e) => handleGenres(e)}>
                        <option hidden>...</option>
                        { stategenres && stategenres.map(event => {
                            key++
                            return ( <option key={key} value={event} >{event}</option> )})  
                        }
                    </select>

                    { errors.genres && ( <p className={styles.errors}>{errors.genres}</p> ) }
                    
                    <button className={styles.buttonhome} onClick={(event) => handleResetGenres(event)}>Clean Genres</button>
                </div>
                
                <button className={styles.buttonhome} type='submit'>Create</button>
                
                <div>
                    <h3 className={styles.selected}>Genres selected:</h3>
                    <p className={styles.h4state}>{input.genres.map(event => event + ', ')}</p>
                </div>
                
                <div>
                    <h3 className={styles.selected}>Platforms selected:</h3>
                    <h4 className={styles.h4state}>{input.platforms}</h4>
                </div>
            
            </form>
        
        </div>
    )
}

export default Form;