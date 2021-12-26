const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Blog", function () {
  it("Should allow adding records", async function () {
    const Blog = await ethers.getContractFactory("Blog");
    const blog = await Blog.deploy();
    await blog.deployed();
    expect(await blog.getLatestRecordId()).to.equal(0);

    const addRecordTx = await blog.addRecord("Hello, world!");
    await addRecordTx.wait();

    expect(await blog.getLatestRecordId()).to.equal(1);
    expect(await blog.getRecord(0)).to.equal("");
    expect(await blog.getRecord(1)).to.equal("Hello, world!");

    const editRecordTx = await blog.editRecord(0, "Hi!!1");
    await editRecordTx.wait()
  
    expect(await blog.getRecord(0)).to.equal("Hi!!1");
    expect(await blog.getRecord(1)).to.equal("Hello, world!");
    expect(await blog.getLatestRecordId()).to.equal(1);

    const deleteRecordTx = await blog.deleteRecord(0);
    await deleteRecordTx.wait()
  
    expect(await blog.getRecord(0)).to.equal("");
    expect(await blog.getRecord(1)).to.equal("Hello, world!");
    expect(await blog.getLatestRecordId()).to.equal(1);
  });
});
