import { expect } from "chai";
import { mount } from "@vue/test-utils";
import { Given, When, Then } from "@/../tests/unit/test-utils.js";
import Edit from "@/components/Document/components/Edit.vue";


Given("a Edit", () => {
  When("it is clicked", () => {
    let edit;

    beforeEach(() => {
      edit = mount(Edit, {
        propsData: {
          browser: {
            status: 200,
            headers: {}
          }
        }
      });

      edit.trigger("click");
    });

    Then("it should emit a click event", () => {
      expect(edit.emitted().click.length).to.eql(1);
    });
  });
});
