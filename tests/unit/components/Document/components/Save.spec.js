import { expect } from "chai";
import { mount } from "@vue/test-utils";
import { Given, When, Then } from "@/../tests/unit/test-utils.js";
import Save from "@/components/Document/components/Save.vue";


Given("a Save", () => {
  When("it is clicked", () => {
    let save;

    beforeEach(() => {
      save = mount(Save, {
        propsData: {
          browser: {
            status: 200,
            headers: {}
          }
        }
      });

      save.trigger("click");
    });

    Then("it should emit a click event", () => {
      expect(save.emitted().click.length).to.eql(1);
    });
  });
});
