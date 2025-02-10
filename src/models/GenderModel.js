class GenderModel {
  constructor() {}

  static create(id, name) {
    const model = new GenderModel();
    model.id = id;
    model.name = name;
    return model;
  }

  static createList() {
    if (GenderModel.instance) return GenderModel.instance;
    const genders = ["Male", "Female"];
    GenderModel.instance = genders.map((gender, index) =>
      this.create(index + 1, gender)
    );
    return GenderModel.instance;
  }
}

export { GenderModel };
