import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Welcome!
      </h1>
      <p className="mb-4">
        {`Hello! My name is Sean Aidan O'Toole and this is my portfolio. I am a software engineer and data scientist.
        I am currently a student at the University of Texas at San Antonio.
        I am interested in machine learning, artificial intelligence, and software engineering.
        `}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
