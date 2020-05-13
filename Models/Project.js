class Project{
    constructor(name, description, languages, creator, github, usersSignedUp, created) {
        this.name = name;
        this.description = description;
        this.languages = languages;
        this.creator = creator;
        this.github = github;
        this.usersSigned = usersSignedUp;
        this.created = created;
    }
}

module.exports = Project