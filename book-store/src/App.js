import './categories.styles.scss';
import CategoryItem from './components/category-item/category-item.component';

const App = () => {

  const categories = [
    {
      id: 1,
      title: 'Literature & Fiction',
      imageUrl: 'https://m.media-amazon.com/images/I/91U7rItuAML.jpg'
    },
    {
      id: 2,
      title: 'Biographies & Memoirs',
      imageUrl: 'https://m.media-amazon.com/images/I/51bZujlJxlL._AC_SY780_.jpg'
    },
    {
      id: 3,
      title: 'Mystery, Thriller & Suspense',
      imageUrl: 'https://m.media-amazon.com/images/I/51bZujlJxlL._AC_SY780_.jpg'
    },
    {
      id: 4,
      title: 'Science & Math',
      imageUrl: 'https://m.media-amazon.com/images/I/51bZujlJxlL._AC_SY780_.jpg'
    },
    {
      id: 5,
      title: 'Science Fiction & Fantasy',
      imageUrl: 'https://wallpapercave.com/wp/wp1863544.jpg'
    },
    {
      id: 6,
      title: 'Politics & Social Sciences',
      imageUrl: 'https://m.media-amazon.com/images/I/51bZujlJxlL._AC_SY780_.jpg'
    }
  ];

  return (
    <div className="categories-container">
      {categories.map(category => {
        return(
          <CategoryItem key={category.id} category={category}/>
        )
      })}

    </div>
  );
}

export default App;
