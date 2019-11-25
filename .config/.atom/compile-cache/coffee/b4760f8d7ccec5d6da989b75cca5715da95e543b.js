(function() {
  module.exports = {
    title: 'Delete Flow',
    description: 'Run only on deleting text',
    handle: function(input, switcher, comboLvl) {
      if (!input.hasDeleted()) {
        return switcher.offAll();
      } else if (comboLvl === 0) {
        switcher.offAll();
        return switcher.on('comboMode');
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvam9lbC8uYXRvbS9wYWNrYWdlcy9hY3RpdmF0ZS1wb3dlci1tb2RlL2xpYi9mbG93L2RlbGV0ZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQSxNQUFNLENBQUMsT0FBUCxHQUNFO0lBQUEsS0FBQSxFQUFPLGFBQVA7SUFDQSxXQUFBLEVBQWEsMkJBRGI7SUFHQSxNQUFBLEVBQVEsU0FBQyxLQUFELEVBQVEsUUFBUixFQUFrQixRQUFsQjtNQUNOLElBQUcsQ0FBQyxLQUFLLENBQUMsVUFBTixDQUFBLENBQUo7ZUFDRSxRQUFRLENBQUMsTUFBVCxDQUFBLEVBREY7T0FBQSxNQUVLLElBQUcsUUFBQSxLQUFZLENBQWY7UUFDSCxRQUFRLENBQUMsTUFBVCxDQUFBO2VBQ0EsUUFBUSxDQUFDLEVBQVQsQ0FBWSxXQUFaLEVBRkc7O0lBSEMsQ0FIUjs7QUFERiIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID1cbiAgdGl0bGU6ICdEZWxldGUgRmxvdydcbiAgZGVzY3JpcHRpb246ICdSdW4gb25seSBvbiBkZWxldGluZyB0ZXh0J1xuXG4gIGhhbmRsZTogKGlucHV0LCBzd2l0Y2hlciwgY29tYm9MdmwpIC0+XG4gICAgaWYgIWlucHV0Lmhhc0RlbGV0ZWQoKVxuICAgICAgc3dpdGNoZXIub2ZmQWxsKClcbiAgICBlbHNlIGlmIGNvbWJvTHZsID09IDBcbiAgICAgIHN3aXRjaGVyLm9mZkFsbCgpXG4gICAgICBzd2l0Y2hlci5vbignY29tYm9Nb2RlJylcbiJdfQ==
