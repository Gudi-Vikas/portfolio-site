import React, { useEffect, useState } from 'react'
import './Projects.css'
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import EditForm from '../../Components/EditForm/EditForm';

const Projects = ({ url }) => {
  const [data, setData] = useState({
    title: "",
    description: "",
    technologies: "",
    started: "",
    completed: "",
    repo: "",
    demo: ""
  });
  const [editData, setEditData] = useState(null);
  const [edit, setEdit] = useState(false);
  const [idOfEdit, setIdOfEdit] = useState(null);
  const [image, setImage] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const onEditChangeHandler = (e) => {
    if (!editData) return;
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return; // Prevent double submission
    
    setIsSubmitting(true);
    
    try {
      const technologyArr = data.technologies
        ? data.technologies.split(",").map(s => s.trim().replace(/\s+/g, " ")).filter(Boolean)
        : [];
      const formData = new FormData();
      formData.append("title", data.title.trim());
      formData.append("description", data.description.trim());
      formData.append("technologies", JSON.stringify(technologyArr));
      formData.append("started", data.started.trim());
      formData.append("completed", data.completed.trim());
      formData.append("repo", data.repo.trim());
      formData.append("demo", data.demo.trim());
      if (image) formData.append("image", image);

      const resp = await axios.post(`${url}/api/projects/add`, formData);
      if (resp.data.success) {
        setData({ title: "", description: "", technologies: "", started: "", completed: "", repo: "", demo: "" });
        setImage(false);
        toast.success("Project added successfully! 🎉");
        await fetchProjects();
      } else {
        setImage(false);
        toast.error(resp.data.message || "Failed to add project");
      }
    } catch (err) {
      console.error("Add project error:", err);
      const errorMessage = err.response?.data?.message || "Network error. Please check your connection.";
      toast.error(errorMessage);
      setImage(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const projectFormHistory = async (id) => {
    if (!id) return toast.error("No project id provided");
    console.log("Project ID:", id);
    console.log("Requesting:", `${url}/api/projects/project/${encodeURIComponent(id)}`);
    try {
      const resp = await axios.get(`${url}/api/projects/project/${encodeURIComponent(id)}`);
      console.log("API Response:", resp.data);
      if (!resp.data || !resp.data.success) {
        toast.error(resp.data?.message || "Failed to fetch project");
        return;
      }
      const proj = resp.data.data;
      let techString = "";
      if (Array.isArray(proj.technologies)) {
        techString = proj.technologies.join(", ");
      } else if (typeof proj.technologies === "string" && proj.technologies.trim() !== "") {
        techString = proj.technologies;
      }
      setEditData({
        title: proj.title || "",
        description: proj.description || "",
        technologies: techString,
        started: proj.started || "",
        completed: proj.completed || "",
        repo: proj.repo || "",
        demo: proj.demo || "",
        image: proj.image || ""
      });
      setIdOfEdit(id);
      setEdit(true);
    } catch (err) {
      console.error("Error fetching project:", err);
      console.error("Error response:", err.response?.data);
      toast.error("Network error while fetching project data for edit");
    }
  };

  const projectRemove = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this project? This action cannot be undone.");
    if (!ok) return;
    try {
      const resp = await axios.delete(`${url}/api/projects/project/${encodeURIComponent(id)}`);
      if (resp.data.success) {
        toast.success(resp.data.message);
        await fetchProjects();
      } else {
        toast.error(resp.data.message || "Delete failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error while deleting project");
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const resp = await axios.get(`${url}/api/projects/allprojects`);
      if (resp.data.success) {
        console.log("Projects fetched:", resp.data.data);
        console.log("First project ID:", resp.data.data[0]?._id);
        setProjectList(resp.data.data);
      } else toast.error("Error fetching projects");
    } catch (err) {
      console.error(err);
      toast.error("Network error while fetching projects");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='admin-section'>
      <div className='form-card'>
        <p className='section-title'>Add Project</p>
        <form className='flex-col' onSubmit={onSubmitHandler}>
          <div className='field-group flex-col'>
            <p>Title</p>
            <input type='text' name='title' placeholder='e.g., Portfolio Website' value={data.title || ""} onChange={onChangeHandler} required />
          </div>

          <div className='field-group flex-col'>
            <p>Image</p>
            <label htmlFor="image" className='image-upload'>
              <img className='upload-asset' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
            </label>
            <input type="file" id='image' onChange={(e) => setImage(e.target.files[0])} hidden />
          </div>

          <div className='field-group flex-col'>
            <p>Description</p>
            <textarea name='description' placeholder='Brief project description...' value={data.description || ""} className='textarea-projects' onChange={onChangeHandler} rows={4} required />
          </div>

          <div className='field-group flex-col'>
            <p>Technologies (Separate with commas)</p>
            <input type='text' name='technologies' placeholder='e.g., React, Vite, CSS' value={data.technologies || ""} onChange={onChangeHandler} />
          </div>

          <div className='field-group flex-col'>
            <p>Started</p>
            <input type='text' name='started' value={data.started || ""} placeholder='DD/MM/YY' onChange={onChangeHandler} required />
          </div>

          <div className='field-group flex-col'>
            <p>Completed <small>*optional</small></p>
            <input type='text' name='completed' placeholder='DD/MM/YY' value={data.completed || ""} onChange={onChangeHandler} />
          </div>

          <div className='field-group flex-col'>
            <p>Repo Link</p>
            <input type='url' name='repo' placeholder='https://github.com/...' value={data.repo || ""} onChange={onChangeHandler} />
          </div>

          <div className='field-group flex-col'>
            <p>Demo Link <small>*optional</small></p>
            <input type='url' name='demo' placeholder='https://project-demo.com' value={data.demo || ""} onChange={onChangeHandler} />
          </div>

          <button type='submit' className='add-btn' disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add"}
          </button>
        </form>
      </div>

      <div className='list-card'>
        <p className='section-title'>Projects List</p>
        <div className='list-table'>
          <div className='list-table-format-project title'>
            <b>Image</b><b>Title</b><b>Started</b><b>repoLink</b><b>Edit</b><b>Delete</b>
          </div>

          {isLoading ? (
            <p className='text-center'>Loading projects...</p>
          ) : projectList.length === 0 ? (
            <p className='text-center'>No projects found. Add a new one!</p>
          ) : (
            projectList.map((item, idx) => (
              <div key={idx} className='list-table-format-project'>
                <img src={url + item.image} alt={item.title} />
                <p>{item.title}</p>
                <p>{item.started || '-'}</p>
                <p className='truncate'>{item.repo ? <a href={item.repo} target='_blank' rel='noreferrer'>Link</a> : '—'}</p>

                <p className='cursor edit' onClick={() => projectFormHistory(item._id)} ><img src={assets.edit_icon} alt="" /></p>
                <p className='cursor remove' onClick={() => projectRemove(item._id)}>×</p>
              </div>
            ))
          )}
        </div>
      </div>

      {edit && editData ? (
        <EditForm
          edit={edit}
          setEdit={setEdit}
          url={url}
          idOfEdit={idOfEdit}
          data={editData}
          setData={setEditData}
          onChangeHandler={onEditChangeHandler}
          setIdOfEdit={setIdOfEdit}
          onUpdateSuccess={fetchProjects}
        />
      ) : null}
    </div>
  );
};

export default Projects;
