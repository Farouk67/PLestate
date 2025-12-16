export default {
  name: 'inquiry',
  title: 'Inquiry',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required().email()
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string'
    },
    {
      name: 'property',
      title: 'Property',
      type: 'reference',
      to: [{ type: 'property' }]
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 4
    },
    {
      name: 'inquiryType',
      title: 'Inquiry Type',
      type: 'string',
      options: {
        list: [
          { title: 'General Inquiry', value: 'general' },
          { title: 'Property Viewing', value: 'viewing' },
          { title: 'More Information', value: 'info' },
        ]
      }
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Closed', value: 'closed' }
        ]
      },
      initialValue: 'new'
    },
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      status: 'status'
    },
    prepare(selection) {
      const { title, subtitle, status } = selection
      return {
        title,
        subtitle: `${subtitle} - ${status}`
      }
    }
  }
}
