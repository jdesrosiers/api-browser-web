import { expect } from "chai";
import { mount } from "@vue/test-utils";
import App from "@/App.vue";
import Code from "@/components/Code.vue";
import sinon from "sinon";
import WelcomeBanner from "@/components/WelcomeBanner.vue";
import { Given, When, Then, And, wait } from "./test-utils.js";
//import * as appHelper from "@/app-helper.js";


Given("an App", () => {
  let app;

  const hashUrl = "#http%3A%2F%2Fexample.com";
  const url = "http://example.com";

  const anotherHashUrl = "#http%3A%2F%2Fanother-example.com";
  const expectedUrl = "http://another-example.com";

  const successfulResponse = {
    status: 200,
    statusText: "OK"
  };
  const errorResponse = {
    status: 404,
    statusText: "Not Found"
  };

  beforeEach(async () => {
    window.location.hash = hashUrl;
    await wait(0);

    app = mount(App, {
      data: { url },
      methods: {
        // TODO: remove this later?
        request: () => {}
      }
    });
  });

  afterEach(() => {
    app.vm.$destroy();
    window.location.hash = "";
  });

  When("there is no URL", () => {
    beforeEach(() => {
      app.setData({ url: "" });
    });

    Then("display the WelcomeBanner", () => {
      expect(app.contains(WelcomeBanner)).to.equal(true);
    });

    Then("don't display the Code", () => {
      expect(app.contains(Code)).to.equal(false);
    });
  });

  When("there is a URL", () => {
    Then("don't display the WelcomeBanner", () => {
      expect(app.contains(WelcomeBanner)).to.equal(false);
    });

    Then("display the Code", () => {
      expect(app.contains(Code)).to.equal(true);
    });
  });

  When("the URL in the API bar is updated to a valid URL", () => {
    const anotherUrl = "http://another-example.com";
    const expectedHashUrl = "#http%3A%2F%2Fanother-example.com";

    beforeEach(() => {
      app.setData({ url: anotherUrl });
    });

    Then("the hash location should be set to the encoded URL", () => {
      expect(window.location.hash).to.equal(expectedHashUrl);
    });

    And("the <Enter> key is pressed in the UrlBar", () => {
      let spy;
      let input;

      beforeEach(() => {
        spy = sinon.spy(app.vm, "request");

        input = app.find("input");
        input.trigger("keyup.enter");
      });

      afterEach(() => {
        app.vm.request.restore();
      });

      Then("a request should be made", () => {
        expect(spy.calledOnce, "spy is not being called 1 time").to.be.true;
      });

      Then("the request should be made to the correct URL", () => {
        expect(spy.calledWith(anotherUrl), "spy was not called with the correct URL").to.be.true;
      });
    });
  });

  When("the URL in the API bar is updated to an invalid URL", () => {
    beforeEach(() => {
      app.setData({ url: "abc" });
    });

    And("the <Enter> key is pressed in the UrlBar", () => {
      let input;

      beforeEach(() => {
        input = app.find("input");
        input.trigger("keyup.enter");
      });

      Then("an error message should be displayed", () => {
        expect(app.text()).to.contain("ERROR");
      });

      Then("the message should be displayed as text", () => {
        let code = app.find("Code");

        expect(code.element.classList.contains("text")).to.be.true;
      });
    });
  });

  When("the component is mounted and the hash is set", () => {
    Then("the URL should be decoded", () => {
      expect(app.vm.url).to.equal(url);
    });
  });

  When("the hash is changed to an encoded URL", () => {
    beforeEach(async () => {
      window.location.hash = anotherHashUrl;
      await wait(0);
    });

    Then("the URL should be decoded", () => {
      expect(app.vm.url).to.equal(expectedUrl);
    });
  });

  When("the hash is changed", () => {
    let spy;

    beforeEach(() => {
      spy = sinon.spy(app.vm, "request");
    });

    afterEach(() => {
      app.vm.request.restore();
    });

    And("the URL is valid", () => {
      beforeEach(async () => {
        window.location.hash = anotherHashUrl;
        await wait(0);
      });

      Then("a request should be made", () => {
        expect(spy.calledOnce, "spy is not being called 1 time").to.be.true;
      });
    });

    And("the URL is invalid", () => {
      beforeEach(async () => {
        window.location.hash = "abc";
        await wait(0);
      });

      Then("no request should be made", () => {
        expect(spy.notCalled, "spy is being called at least 1 time").to.be.true;
      });

      Then("an error message should be displayed", () => {
        expect(app.text()).to.contain("ERROR");
      });

      Then("the message should be displayed as text", () => {
        let code = app.find("Code");

        expect(code.element.classList.contains("text")).to.be.true;
      });
    });
  });

  When("a successful response is returned", () => {
    let codeProps;
    //const data = {
    //  wasResponseAnError: false,
    //  statusText: "OK"
    //};

    beforeEach(async () => {
      //window.fetch = () => {};
      //sinon.stub(window, "fetch");

      //window.fetch.returns(Promise.resolve(data));

      //sinon.spy(appHelper, "request");

      app.setData({
        body: "some-body",
        wasResponseAnError: false,
        statusText: ""
      });

      app.setMethods({
        request: app.vm.handleResponse
      });

      app.vm.request(successfulResponse);

      //app.vm.newRequest("/foo");
      //app.update();

      codeProps = app.find(Code).vm._props;
    });

    //afterEach(() => {
    //  appHelper.request.restore();
    //});

    Then("the response was not an error", () => {
      expect(codeProps.wasResponseAnError).to.equal(false);
    });

    Then("the status text is set correctly", () => {
      //console.log(app.vm.statusText);
      //console.log(app.vm.wasResponseAnError);
      expect(codeProps.statusText).to.equal("OK");
    });
  });

  When("an error response is returned", () => {
    let codeProps;

    beforeEach(async () => {
      app.setData({
        body: "some-body",
        wasResponseAnError: false,
        statusText: ""
      });

      app.setMethods({
        request: app.vm.handleResponse
      });

      app.vm.request(errorResponse);

      codeProps = app.find(Code).vm._props;
    });

    Then("the status text is set correctly", () => {
      expect(app.text().includes("Not Found")).to.be.true;
    });

    And("then a 2XX response is returned", () => {
      beforeEach(async () => {
        app.vm.request(successfulResponse);
      });

      Then("the response was not an error", () => {
        expect(codeProps.wasResponseAnError).to.equal(false);
      });

      Then("the status text is set correctly", () => {
        expect(codeProps.statusText).to.equal("OK");
      });
    });

    And("then an invalid URL is entered", () => {
      let input;

      beforeEach(() => {
        app.setData({ url: "abc" });

        input = app.find("input");
        input.trigger("keyup.enter");
      });

      Then("the message for an error response should not be displayed", () => {
        expect(app.text().includes("Not Found")).to.be.false;
      });
    });
  });

  When("a response with link headers is returned", () => {
    const rawLinks =
      "</example>; rel=\"http://base.com\"; title=\"Example link\", " +
      "</test>; rel=\"http://test.com\"; title=\"Test link\"";

    beforeEach(() => {
      app.setMethods({
        request: app.vm.setLinks
      });

      app.vm.request(rawLinks);

      app.update();
    });

    Then("one link should be displayed", () => {
      expect(app.text().includes("Example link")).to.be.true;
    });

    Then("the second link should be displayed", () => {
      expect(app.text().includes("Test link")).to.be.true;
    });

    Then("the link's href should be set correctly", () => {
      expect(app.vm.links[0].href).to.equal("#http%3A%2F%2Fexample.com%2Fexample");
    });

    And("then an invalid URL is entered", () => {
      let input;

      beforeEach(() => {
        app.setData({ url: "abc" });

        input = app.find("input");
        input.trigger("keyup.enter");
      });

      Then("no links are displayed", () => {
        expect(app.text().includes("link")).to.be.false;
      });
    });
  });

  When("a response without link headers is returned", () => {
    beforeEach(() => {
      app.vm.request([]);
      app.update();
    });

    Then("no links are displayed", () => {
      expect(app.text().includes("link")).to.be.false;
    });
  });
});
