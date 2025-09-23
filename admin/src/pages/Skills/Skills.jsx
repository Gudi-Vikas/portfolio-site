import React, { useEffect, useMemo, useState } from 'react'
import './Skills.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify';

const Skills = ({ url }) => {
    //add start
    const [image, setImage] = useState(false)
    const [data, setData] = useState({
        category: "",
        name: "",
        link: "",
    })
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }


    const onSubmitHandler = async (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("link", data.link)
        formData.append("category", data.category)
        formData.append("image", image)
        const response = await axios.post(`${url}/api/skills/add`, formData, { headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')||''}` } })
        if (response.data.success) {
            setData({
                name: "",
                link: "",
                category: ""

            })
            setImage(false)
            toast.success(response.data.message)
            await fetchList() // Refresh the list after adding

        } else {
            setImage(false)
            toast.error(response.data.message)
            console.log(response.data.message);

        }

    }

    //add end

    //all skills list start
    const [skillList, setSkillList] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchList = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${url}/api/skills/allskills`);
            
            if (response.data.success) {
                setSkillList(response.data.data)
            } else {
                toast.error("error")
            }
        } catch (error) {
            toast.error("Failed to fetch skills");
        } finally {
            setLoading(false);
        }
    }   
    useEffect(() => {
        fetchList()
    }, [])

    //skill remove start

    const skillRemove = async (skillId) => {
        const ok = window.confirm("Are you sure you want to delete this skill?")
        if (!ok) return

        try {
            const response = await axios.post(`${url}/api/skills/remove`, { id: skillId }, { headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')||''}` } })
            if (response?.data?.success) {
                toast.success(response.data.message)
                await fetchList()
            } else {
                toast.error(response?.data?.message || "Error deleting skill")
            }
        } catch (err) {
            console.error(err)
            toast.error("Network error while deleting skill")
        }
    }



    return (
        <div className='admin-section'>
            <div className='form-card'>
                <p className='section-title'>Add Skill</p>
                <hr />
                <form className='flex-col' onSubmit={onSubmitHandler}>
                    <div className='field-group flex-col'>
                        <p>Category</p>
                        <input
                            type='text'
                            name='category'
                            placeholder='e.g., Frontend'
                            value={data.category}
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div className='field-group flex-col'>
                        <p>Name</p>
                        <input
                            type='text'
                            name='name'
                            placeholder='e.g., React'
                            value={data.name}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>
                    <div className='field-group flex-col'>
                        <p>Upload Image</p>
                        <label htmlFor="image" className='.image-upload'>
                            <img className='upload-asset' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                        </label>
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />

                    </div>
                    <div className='field-group flex-col'>
                        <p>Link</p>
                        <input
                            type='url'
                            name='link'
                            placeholder='https://...'
                            value={data.link}
                            onChange={onChangeHandler}
                        />
                    </div>
                    <button type='submit' onClick={onSubmitHandler} className='add-btn'>Add</button>
                </form>
            </div>
            <div className='list-card'>
                <div className='section-header'>
                    <p className='section-title'>Skills List</p>
                    <button 
                        className='reload-btn' 
                        onClick={fetchList}
                        disabled={loading}
                        title="Refresh skills list"
                    >
                        {loading ? '⟳' : '↻'} Reload
                    </button>
                </div>
                <div className='list-table'>
                    <div className='list-table-format title'>
                        <b>Image</b>
                        <b>Name</b>
                        <b>Category</b>
                        <b>Link</b>
                        <b>Action</b>
                    </div>
                    {loading ? (
                        <div className='loading-container'>
                            <div className='loading-spinner'></div>
                            <p>Loading skills...</p>
                        </div>
                    ) : skillList.length === 0 ? (
                        <div className='empty-state'>
                            <p>No skills found</p>
                        </div>
                    ) : (
                        skillList.map((item, index) => (
                            <div key={index} className='list-table-format'>
                                {item.image ? <img src={`${url}${item.image}`} alt={item.name} /> : <div className='thumb-fallback'>—</div>}
                                <p>{item.name}</p>
                                <p>{item.category || '-'}</p>
                                <p className='truncate'>
                                    {item.link ? (
                                        <a href={item.link} target='_blank' rel='noreferrer'>Link</a>
                                    ) : (
                                        '—'
                                    )}
                                </p>
                                <p className='cursor remove' onClick={() => skillRemove(item._id)}>×</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Skills


