export const header = {
  mainHeading: 'Task manager',
  imageFilePath: 'images/task-manager.png',
  imageAlt: 'Task manager',
};

export const state = {
  isModalOpen: false,
  editingId: null,
  searchQuery: '',
  search: '',
};

export const table = {
  tableRowsTitle: {
    id: 'ID №',
    title: 'Task title',
    description: 'Task description',
    weight: 'Task weight',
    date: 'Created At',
    action: 'Action',
  },
  buttonTitles: {
    add: 'Add task',
    delete: 'Delete',
    edit: 'Edit',
    searchPlaceholder: 'Search task',
  },
  modalAlerts: {
    add: 'Record was added successfully!',
    update: 'Record was updated successfully!',
    delete: 'Record was deleted successfully!',
    error: 'Error while saving record',
  },
  modalTitles: {
    edit: 'Edit record',
    add: 'Add record',
    save: 'Save',
    formTitles: {
      title: 'Enter the name',
      description: 'Enter the description',
      weight: 'Choose a weight',
      date: 'Select a date',
    }
  },
  defaultRowItems: [
    {
      id: 1,
      title: 'Test row #1',
      description: 'This is default description for row #1',
      weight: 100,
      date: new Date(),
    },
    {
      id: 2,
      title: 'Test row #2',
      description: 'This is default description for row #2',
      weight: 42,
      date: new Date(Date.now() - 86400000 * 5),
    },
  ],
};
