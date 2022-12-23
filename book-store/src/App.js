import './categories.styles.scss'

const App = () => {

  const categories = [
    {
      id: 1,
      title: 'Literature & Fiction'
    },
    {
      id: 2,
      title: 'Biographies & Memoirs'
    },
    {
      id: 3,
      title: 'Mystery, Thriller & Suspense'
    },
    {
      id: 4,
      title: 'Science & Math'
    },
    {
      id: 5,
      title: 'Science Fiction & Fantasy'
    },
    {
      id: 6,
      title: 'Politics & Social Sciences'
    }
  ];

  return (
    <div className="categories-container">
      {categories.map(category => {
        return (
          <div className="category-container" key={category.id}>
            <div className="background-image"/>
            <div className="category-body-container">
              <h2>{category.title}</h2>
              <p>Shop Now</p>
            </div>
          </div>
        )
      })}

    </div>
  );
}

export default App;
