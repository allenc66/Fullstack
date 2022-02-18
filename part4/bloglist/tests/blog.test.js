const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = [{}]

   const result = listHelper.dummy(blogs)
   expect(result).toBe(1)
   })

describe('total likes', () => {
   const listWithNoBlog = []

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(listWithNoBlog)
        expect(result).toEqual(0)
      })


    const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        }
      ]
    
    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toEqual(5)
      })

    const listWithBlogs =[
      {
        "title": "React patterns",
        "author": "Michael Chan",
        "url": "https://reactpatterns.com/",
        "likes": 7
      },
      {
        "title": "Go To Statement Considered Harmful",
        "author": "Edsger W. Dijkstra",
        "url": "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        "likes": 5
      },
      {
        "title": "Canonical string reduction",
        "author": "Edsger W. Dijkstra",
        "url": "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        "likes": 12
      }
    ]
    
    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listWithBlogs)
        expect(result).toEqual(24)
      })

    test('favorite blog with most likes ', () => {
        const result = listHelper.favoriteBlog(listWithBlogs)
        expect(result).toEqual(listWithBlogs[2])
      })
    })

describe('Most blogs author and most likes author', () => {
      const listWithBlogs =[{
        "title": "React patterns",
        "author": "Michael Chan",
        "url": "https://reactpatterns.com/",
        "likes": 7
      },
      {
        "title": "Go To Statement Considered Harmful",
        "author": "Edsger W. Dijkstra",
        "url": "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        "likes": 5
      },
      {
        "title": "Canonical string reduction",
        "author": "Edsger W. Dijkstra",
        "url": "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        "likes": 12
      },
      {
        "title": "First class tests",
        "author": "Robert C. Martin",
        "url": "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        "likes": 10
      },
      {
        "title": "TDD harms architecture",
        "author": "Robert C. Martin",
        "url": "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        "likes": 0
      },
      {
        "title": "Type wars",
        "author": "Robert C. Martin",
        "url": "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        "likes": 2
      }  
    ]
      test('show most blogs author and their number of blogs', () => {
        const result = listHelper.mostBlogsAuthor(listWithBlogs)

        expect(result).toEqual({
          "author": "Robert C. Martin",
          "blogs": 3
        })
      })

      test('show the most likes author', () => {
        const result = listHelper.mostLikesAuthor(listWithBlogs)
    
        expect(result).toEqual({
          "author": "Edsger W. Dijkstra",
          "likes": 17
        })
      })
    })
    

       
       
      



    
