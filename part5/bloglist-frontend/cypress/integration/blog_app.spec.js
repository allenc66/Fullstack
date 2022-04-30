describe('Blog app', function() {  // Mocha recommends that arrow functions are not used, because they might cause some issues in certain situations.
   beforeEach(function(){
    cy.request('POST', 'http://localhost:3002/api/testing/reset')
    const user = {
      name: 'Allen Chen',
      username: 'abcd123',
      password: 'abcd123'
    }
    cy.request('POST', 'http://localhost:3002/api/users/', user) 
    cy.visit('http://localhost:3000')
   })
   
    it('front page can be opened', function() {
      //cy.visit('http://localhost:3000')
      cy.contains('Blog List')
      cy.contains('App created by CMY')
    })

    /*it('front page contains random text', function() {
        cy.visit('http://localhost:3000')
        cy.contains('wtf is this app?')
      })*/

     it('login form is shown', function() {
         //cy.visit('http://localhost:3000')
         cy.contains('log in').click()
     }) 
     describe('Login', function() {
      it('succeeds with correct credentials', function(){
        cy.contains('log in').click()
        cy.get('#username').type('abcd123')
        cy.get('#password').type('abcd123')
        cy.get('#login-button').click()

        cy.contains('Allen Chen is logged in')
    })

      it('fails with wrong credentials', function() {
        cy.contains('log in').click()
        cy.get('#username').type('wrongusername')
        cy.get('#password').type('wrongpassword')
        cy.get('#login-button').click()

        cy.get('.Warning').should('contain','Wrong username or password')

        cy.get('html').should('not.contain', 'Allen Chen logged in')
        })
    })
     

describe('when logged in', function(){
      beforeEach(function(){
        cy.login({username: 'abcd123', password:'abcd123'})
          /*cy.request('login', 'http://localhost:3002/api/login', {
             username:'abcd123', password:'abcd123'
           }).then(response => {
             localStorage.setItem('loggedBlogUser', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
           })*/
            /*cy.contains('log in').click()
            cy.get('#username').type('abcd123')
            cy.get('#password').type('abcd123')
            cy.get('#login-button').click() */   
         })

      it('a blog can be created', function(){
          cy.contains('New Blog').click()
          cy.get('#title').type('test title')
          cy.get('#author').type('test author')
          cy.get('#url').type('www.testURL.com')
          cy.contains('save').click()
          cy.contains('test title BY test author')
         })

         describe ('and a blog exists', function(){
           beforeEach(function () {
             cy.createBlog({
               title: 'test B',
               author: 'tester B',
               url: 'testB.com'
             })
           })

           it("it can be liked", function () {
            cy.contains("test B");
            cy.contains("view").click();
            cy.get(".likeButton").click();
            cy.get(".likeContainer").contains("1 like");
            cy.get(".likeButton").click();
            cy.get(".likeContainer").contains("2 like");
          })

          it("and deleted by creator", function () {
            cy.contains("test B");
            cy.contains("view").click();
            cy.contains("Remove").click();
            cy.get("html").should("not.contain", "test B")
          })

        })

        describe("several blogs can be created", function () {
          beforeEach(function () {
            cy.createBlog({
              title: "Blog with 1 like",
              author: "Tester A",
              url: "testA.com",
              likes: 1,
            });
            cy.createBlog({
              title: "Blog with 100 likes",
              author: "Tester B",
              url: "testB.com",
              likes: 15,
            });
            cy.createBlog({
              title: "Blog with 50 likes",
              author: "Tester C",
              url: "testC.com",
              likes: 6,
            })
          })

          it("and they are automatically sorted by likes", function () {
            cy.get(".blog-container>.blogTitle").should((items) => {
              expect(items[0]).to.contain("Blog with 1 likes");
              expect(items[1]).to.contain("Blog with 50 likes");
              expect(items[2]).to.contain("Blog with 100 like");
            })
          })
        })
        
     })

      
  })
  