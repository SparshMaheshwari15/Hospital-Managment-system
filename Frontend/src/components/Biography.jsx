export default function Biography({imageUrl}){
    return(
        <div className="container biography">
            <div className="banner">
                <img src={imageUrl} alt="about" />
            </div>
            <div className="banner">
                <p>Biography</p>
                <h3>who are you</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt mollitia soluta, ipsam quibusdam itaque at eaque iste quam repellat incidunt numquam obcaecati laudantium nemo voluptatibus. Sequi neque quae sint dolorum quibusdam. Vero unde magni quae. Voluptate facere aliquid sed possimus cumque. Ducimus magnam illum temporibus tenetur aperiam repudiandae placeat molestiae.
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <p>Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit soluta illum dignissimos aliquam similique, eos sapiente quaerat quas voluptatibus molestiae dolor eaque iure, ab optio. Asperiores necessitatibus consectetur provident nulla aut voluptatibus ullam quam voluptatem?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, autem.</p>
                
            </div>
        </div>
    );
}