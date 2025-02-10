class SkillModel {
  constructor() {}

  static create(id, name) {
    const model = new SkillModel();
    model.id = id;
    model.name = name;
    return model;
  }

  static createList() {
    if (SkillModel.instance) return SkillModel.instance;
    const skills = [
      "JavaScript",
      "Python",
      "Java",
      "C++",
      "Ruby",
      "HTML/CSS",
      "SQL",
    ];
    SkillModel.instance = skills.map((skill, index) =>
      this.create(index + 1, skill)
    );
    return SkillModel.instance;
  }
}

export { SkillModel };
