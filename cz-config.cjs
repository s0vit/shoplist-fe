module.exports = {
  types: [
    { value: 'feat', name: 'feat:     A new feature' },
    { value: 'fix', name: 'fix:      A bug fix' },
    { value: 'refactor', name: 'refactor: A code change that neither fixes a bug nor adds a feature' },
    { value: 'test', name: 'test:     Adding missing tests or correcting existing tests' },
    { value: 'docs', name: 'docs:     Documentation only changes' },
    { value: 'style', name: 'style:    Changes that do not affect code semantics (formatting, etc.)' },
    { value: 'chore', name: 'chore:    Changes to the build process or auxiliary tools' },
    { value: 'build', name: 'build:    Changes that affect the build system or external dependencies' }
  ],
  allowCustomScopes: true,
  skipQuestions: ['body', 'footer'],
  subjectLimit: 72,
  messages: {
    type: "Select the type of change that you're committing:",
    scope: "Denote the scope of this change (e.g., component or file name):",
    subject: "Write a short, imperative tense description of the change:",
    confirmCommit: "Are you sure you want to proceed with the commit above?"
  }
};