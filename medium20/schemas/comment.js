export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'email',
    },
    {
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      description: 'Approve the comment to show publicly',
    },
    {
      name: 'comment',
      title: 'Comment',
      type: 'text',
    },
    {
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'post' }],
    },
    {
      name: 'parent',
      title: 'Parent',
      type: 'reference',
      to: [{ type: 'comment' }],
    },
  ],
}
