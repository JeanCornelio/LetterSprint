

export const WritingTest = () => {
  return (
    <section>
    <form action="" >
      <div className="relative w-full ">
      <textarea
        
        name=""
        disabled
        spellCheck="false"
        rows={8}
      
        className="w-full text-3xl bg-transparent text-gray-100 leading-loose resize-none overflow-hidden"
        placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged"
       
      />
      <textarea
       
        name=""
        spellCheck="false"
     
        rows={8}
        autoFocus
        className="w-full text-3xl bg-transparent absolute left-0 outline-none resize-none text-sprint-blue leading-loose overflow-hidden"
        placeholder=""
     
      />
      </div>
    </form>
  </section>
  )
}
