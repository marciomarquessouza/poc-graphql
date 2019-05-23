# poc-graphql
A GraphQL Server using Node and Express

query getCourse(
  $courseID1:Int!,
	$courseID2:Int!) {
  course1: course(id: $courseID1) {
    ...courseFields
  },
  course2: course(id: $courseID2) {
    ...courseFields
  }
}

fragment courseFields on Course {
  title
  topic
  author
  url
}

mutation updateCourseTopic($id:Int!, $topic: String!) {
  updateCourseTopic(id: $id, topic: $topic) {
    id
    title
    topic
    author
    url
  }
}
