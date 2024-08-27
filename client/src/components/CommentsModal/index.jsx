import React from 'react'
import close from "../../assets/icons/close.svg";
import sent from "../../assets/icons/sent.svg";
import Comment from '../Comment';

const CommentsModal = ({isOpenComment,toggleCommentDiv,comments,commentData,setCommentData, newComment,postId,token ,topRef}) => {
  return (
    <div className={`bg-gray-400/50  w-full h-full transition-all duration-500  fixed ${isOpenComment?"bottom-0":"-bottom-[100%]"}  z-40  right-1/2   transform translate-x-1/2   `}>
    <div className={`bg-gray-100 rounded-tl-xl rounded-tr-xl w-3/4  ssm:h-2/3 sm:w-1/2 xl:w-1/3 h-[500px] fixed z-50  transition-all duration-700  ${isOpenComment ? "bottom-0" : "-bottom-[100%]"} right-1/2   transform translate-x-1/2 `}>
      <div className="flex justify-end p-2"> <img className="h-8 w-8  cursor-pointer" onClick={toggleCommentDiv} src={close} alt="close-icon" />
      </div>
              <div className="px-5 pt-3 h-[77%] overflow-y-auto">
                  <div ref={topRef} ></div>
      {
comments.length > 0 
? comments.map((comment, i) => <Comment key={comment.name + i} {...comment} />)
: <div className="text-center text-2xl font-bold">No comment</div>
}
      </div >
      <div className="pt-1 flex gap-3 fixed bottom-1  items-center w-full px-5"><input value={commentData?.comment} onChange={(e)=>setCommentData((prev)=>({...prev,comment:e.target?.value?.trim()}))} className="border-black border w-full py-2 h-[30px] bg-gray-100 px-2 " type="text" /><div><img  onClick={()=>newComment(postId,commentData,token)} className="cursor-pointer" src={sent} alt="sent-icon" /></div></div>
    </div>
  </div>
  )
}

export default CommentsModal