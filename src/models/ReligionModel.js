class ReligionModel {
  constructor() {}

  static create(id, name) {
    const model = new ReligionModel();
    model.id = id;
    model.name = name;
    return model;
  }

  static createList() {
    if (ReligionModel.instance) return ReligionModel.instance;
    const religions = [
      "Christianity",
      "Islam",
      "Hinduism",
      "Buddhism",
      "Judaism",
    ];
    ReligionModel.instance = religions.map((religion, index) =>
      this.create(index + 1, religion)
    );
    return ReligionModel.instance;
  }
}

export { ReligionModel };
