'use client';

import {useState,useEffect} from 'react'
import PromptCard from './PromptCard';

const PromptCardList = ({data,handleTagClick}) => {
  return(
    <div className='mt-16 prompt_layout'>
      {data.map((post)=>(
        <PromptCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}



const filterSearchResults = (searchtext) => {

  const regex = new RegExp(searchtext, "i");

  return allPosts.filter(
    (item) =>
      regex.test(item.creator.username) ||
      regex.test(item.tag) ||
      regex.test(item.prompt)
  );
}

const Feed = () => {

  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  console.log(posts)


  const handleSearchChange = (e) => {

      setSearchText(e.target.value);
  
      const searchResults = filterSearchResults(e.target.value);

      console.log(e.target.value)

  }



  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('api/prompt');
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
    
  },[]);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder='Search for a tag or username'
          value={searchText}
          onChange={handleSearchChange}
          className='search_input peer'
        />
      </form>
      <PromptCardList
        data={posts}
        handleTagClick={()=>{}}
      />
    </section>
  )
}

export default Feed