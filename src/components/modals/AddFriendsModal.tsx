import React , {useState , useEffect, useContext} from 'react'
import styled  from "styled-components"
import SearchIcon from "../../assets/imgs/searchIcon.svg"
import { AvatarComponent } from '../PlayerProfile';
import axios from 'axios';
import { Button } from '../../Pages/SignIn';
import { UserContext } from '../../context/UserContext';

interface UserProp {
  id : string , 
    defaultAvatar: string,
    login : string
    displayName : string
    relation? : string
    nbFriends? : string
    wins : number[]
    losses : number[]
  }
  interface idsType{
    login : string,
    id : string
  }
export default function AddFriendsModal(props : {members : idsType[] , setmembers : (e : any)=>void , closeModal : ()=> void} ) {
    const [friends, setfriends] = useState([])
    const handleFriend= (e : any)=>{ e.stopPropagation();  }
    const done = ()=>{
      props.closeModal()
    }
    const user = useContext(UserContext)

    useEffect(() => {
        user.then((data : UserProp | "{}")=>{
          if (data !== "{}")
          {
            axios.get(process.env.REACT_APP_BACKEND_URL + "/users/friends/" + data.login, 
            {withCredentials: true} 
          ).then((res)=>{
            setfriends(res.data)
          }).catch((err)=>{
            })
          }
        })
        // eslint-disable-next-line
    }  , [])
    
    const exist = (e : any)=>
    {
      for (let i = 0; i < props.members.length; i++) {
          const element = props.members[i];
          if (element.id === e.id)
            return true
          }
          
          return false
        }
  return (
    <AddFriendsModalStyle>
         <SearchBar>

        <input onClick={(e)=>e.stopPropagation()} type="text" placeholder='Search ..' />
    </SearchBar>

    { 
        friends.map((data : any , id :number)=>{
            return <Friend key={id}>
                    <div>
                        <div style={{width : '35px' , height :'35px'}}>
                            <AvatarComponent img={data.defaultAvatar}/>
                        </div>
                        <div className='name'>
                            {data.displayName}
                        </div>
                    </div>
              {
                (!exist({login : data.login , id : data.id})) ? 
                <Button   onClick={(e)=>{handleFriend(e)
                  var test = props.members;
                 
                  test.push({login : data.login , id : data.id})
                   props.setmembers([...test])
                    }} text={"add"}/>
                    :
                    <Button  onClick={(e)=>{handleFriend(e)
                      var test = props.members;
                      test.splice(id , 1)
                      props.setmembers([...test])
              }} text='Added' type='secondary'/>
              }
                    </Friend>
        })
    }
    <Button onClick={done} text="Done" />
    </AddFriendsModalStyle>
  )
}


const AddFriendsModalStyle = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const SearchBar = styled.div`
background:  ${props => props.theme.colors.bg};
border-radius: 5px;
display: flex;
align-items: flex-start;
/* width: 100%; */
/* flex: 1; */
max-width: 600px;
height: 42px;

    /* object-fit : contain; */
    position: relative;
    padding: 0px 0px 0px 40px;
    &::before{
      content: url(${SearchIcon});
      position: absolute;
      left: 10px; 
      top: 55%; 
      transform: translateY(-50%);
    }
    input{
      background-color: transparent;
      width: calc(100% - 40px);
      height: 100%;
      border: none;
      margin: 0;
      padding: 0;
      outline: none;
      color:  ${props => props.theme.colors.seconderyText};;
    font-size:  ${props => props.theme.fontSize.l}; 
      &::placeholder{
    color:  ${props => props.theme.colors.seconderyText};;
    font-size: ${props => props.theme.fontSize.l};
        opacity: 0.6;
      }
  }
  @media  only screen and (max-width: 768px) {
    width: 150px;
max-width: 200px;
  }
`;

const Friend = styled.div`
    width: 95%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 5px;
  margin:  0 auto;
  border-bottom: 0.5px solid  ${props => props.theme.colors.bg} ;
font-family: 'Poppins', sans-serif;

  >div{
    display: flex;
    align-items: center;
    justify-content: row;
    gap: 10px;
    font-size: 20px;
    color:  ${props => props.theme.colors.primaryText};;
    margin-bottom: 20px;
  }
  /* >button{
    color:  ${props => props.theme.colors.seconderyText};
        width: 100px;
        height: 30px;
        border-radius: 5px;
        background-color: ${props => props.theme.colors.purple};; ;
  } */
`;