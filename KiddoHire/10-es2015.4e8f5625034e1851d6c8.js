(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{A8Ph:function(t,e,n){"use strict";n.r(e),n.d(e,"JobsModule",(function(){return St}));var i=n("tyNb"),o=n("PCNd"),c=n("EsRS"),s=n("fXoL"),a=n("sgUz"),r=n("lGQG"),b=n("320Y"),l=n("Witw"),d=n("/t3+"),p=n("kmnG"),m=n("qFsG"),u=n("3Pt+"),h=n("ofXK"),f=n("bTqV"),g=n("Qu3c"),C=n("NFeN");function j(t,e){if(1&t){const t=s.Wb();s.Vb(0,"button",6),s.dc("click",(function(){return s.wc(t),s.hc().openAddJob()})),s.Ec(1," POST NEW JOB "),s.Ub()}}function w(t,e){if(1&t){const t=s.Wb();s.Vb(0,"button",6),s.dc("click",(function(){return s.wc(t),s.hc().appliedJobs()})),s.Ec(1," APPLIED JOBS "),s.Ub()}}function U(t,e){if(1&t){const t=s.Wb();s.Vb(0,"button",6),s.dc("click",(function(){return s.wc(t),s.hc().fetchJobs()})),s.Ec(1," ALL JOBS "),s.Ub()}}function v(t,e){if(1&t){const t=s.Wb();s.Vb(0,"button",7),s.dc("click",(function(){return s.wc(t),s.hc().appliedJobs()})),s.Vb(1,"mat-icon"),s.Ec(2,"pending_actions"),s.Ub(),s.Ub()}2&t&&s.mc("matTooltip","View status of applied jobs")}function V(t,e){if(1&t){const t=s.Wb();s.Vb(0,"button",7),s.dc("click",(function(){return s.wc(t),s.hc().fetchJobs()})),s.Vb(1,"mat-icon"),s.Ec(2,"work"),s.Ub(),s.Ub()}2&t&&s.mc("matTooltip","All jobs")}function x(t,e){if(1&t){const t=s.Wb();s.Vb(0,"button",7),s.dc("click",(function(){return s.wc(t),s.hc().openAddJob()})),s.Vb(1,"mat-icon"),s.Ec(2,"add"),s.Ub(),s.Ub()}2&t&&s.mc("matTooltip","Add a new job post")}let y=(()=>{class t{constructor(t,e){this.jobService=t,this.uiService=e,this.isLoading=new s.o,this.appliedJob=new s.o,this.allJobs=!0,this.toggleFilters=!1,this.minExp=0,this.maxExp=20,this.minCTC=0,this.maxCTC=50,this.minStar=1,this.maxStar=5,this.expOptions={floor:0,ceil:20},this.ctcOptions={floor:1,ceil:50},this.starOptions={floor:1,ceil:5}}ngOnInit(){}fetchCities(){this.jobService.fetchCities(this.cityString).subscribe(t=>{this.cities=t.data})}openAddJob(){this.uiService.openAddJob()}appliedJobs(){this.allJobs=!this.allJobs,this.isLoading.emit(!0),this.appliedJob.emit(!0),this.jobService.fetchAppliedJobs()}fetchJobs(){this.allJobs=!this.allJobs,this.isLoading.emit(!0),this.appliedJob.emit(!1),this.jobService.fetchJobs()}onSearch(){this.isLoading.emit(!0),this.jobService.search(this.search)}}return t.\u0275fac=function(e){return new(e||t)(s.Pb(a.a),s.Pb(l.a))},t.\u0275cmp=s.Jb({type:t,selectors:[["app-search"]],inputs:{user:"user"},outputs:{isLoading:"isLoading",appliedJob:"appliedJob"},decls:12,vars:7,consts:[[1,"p-2","border-bottom"],[1,"p-2","justify-content-center"],[1,"search","pl-4","pr-4"],["type","text","matInput","","placeholder","Search by job title...",3,"ngModel","ngModelChange","keyup"],["class","d-none m-2 d-sm-block","mat-raised-button","","color","primary",3,"click",4,"ngIf"],["class","d-sm-none m-2","mat-mini-fab","","color","primary",3,"matTooltip","click",4,"ngIf"],["mat-raised-button","","color","primary",1,"d-none","m-2","d-sm-block",3,"click"],["mat-mini-fab","","color","primary",1,"d-sm-none","m-2",3,"matTooltip","click"]],template:function(t,e){1&t&&(s.Vb(0,"mat-toolbar",0),s.Vb(1,"mat-toolbar-row",1),s.Vb(2,"mat-form-field",2),s.Vb(3,"mat-label"),s.Ec(4,"Search"),s.Ub(),s.Vb(5,"input",3),s.dc("ngModelChange",(function(t){return e.search=t}))("keyup",(function(){return e.onSearch()})),s.Ub(),s.Ub(),s.Dc(6,j,2,0,"button",4),s.Dc(7,w,2,0,"button",4),s.Dc(8,U,2,0,"button",4),s.Dc(9,v,3,1,"button",5),s.Dc(10,V,3,1,"button",5),s.Dc(11,x,3,1,"button",5),s.Ub(),s.Ub()),2&t&&(s.Cb(5),s.mc("ngModel",e.search),s.Cb(1),s.mc("ngIf","hr"===e.user.role),s.Cb(1),s.mc("ngIf","developer"===e.user.role&&e.allJobs),s.Cb(1),s.mc("ngIf","developer"===e.user.role&&!e.allJobs),s.Cb(1),s.mc("ngIf","developer"===e.user.role&&e.allJobs),s.Cb(1),s.mc("ngIf","developer"===e.user.role&&!e.allJobs),s.Cb(1),s.mc("ngIf","hr"===e.user.role))},directives:[d.a,d.c,p.c,p.g,m.b,u.a,u.m,u.p,h.l,f.a,g.a,C.a],styles:["[_nghost-%COMP%]{padding:0}mat-toolbar[_ngcontent-%COMP%], mat-toolbar-row[_ngcontent-%COMP%]{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;background-color:transparent;position:relative}.job_page[_ngcontent-%COMP%]{position:absolute;right:0}div[mat-menu-content][_ngcontent-%COMP%]{height:200px}mat-form-field[_ngcontent-%COMP%]{font-size:16px}.filters_row[_ngcontent-%COMP%]{max-width:1000px}.search[_ngcontent-%COMP%]{width:100%;max-width:300px;min-width:150px}ng5-slider[_ngcontent-%COMP%]{max-width:200px}span[_ngcontent-%COMP%]{font-size:14px}  .custom-slider .ng5-slider .ng5-slider-bar{background:#ffe4d1;height:2px}  .custom-slider .ng5-slider .ng5-slider-selection{height:3px;background:#f33591}  .custom-slider .ng5-slider .ng5-slider-pointer{width:8px;height:16px;top:auto;bottom:0;background-color:#1a237e;border-top-left-radius:3px;border-top-right-radius:3px}  .custom-slider .ng5-slider .ng5-slider-pointer:after{display:none}  .custom-slider .ng5-slider .ng5-slider-bubble{bottom:14px}  .custom-slider .ng5-slider .ng5-slider-limit{font-weight:700;color:#f33591}  .custom-slider .ng5-slider .ng5-slider-tick{width:1px;height:10px;margin-left:4px;border-radius:0;background:#ffe4d1;top:-1px}  .custom-slider .ng5-slider .ng5-slider-tick.ng5-slider-selected{background:#f33591}"]}),t})();var E=n("Xa2L"),O=n("M9IT"),P=n("Dh3D"),D=n("+0xr"),S=n("Wp6s"),_=n("7EHt"),k=n("A5z7");function J(t,e){if(1&t&&(s.Vb(0,"mat-chip",33),s.Ec(1),s.ic(2,"titlecase"),s.Ub()),2&t){const t=e.$implicit;s.Cb(1),s.Fc(s.jc(2,1,t))}}function I(t,e){1&t&&(s.Vb(0,"th",34),s.Ec(1,"Sl. No."),s.Ub())}function M(t,e){if(1&t&&(s.Vb(0,"td",35),s.Ec(1),s.Ub()),2&t){const t=e.$implicit;s.Cb(1),s.Fc(t.sl)}}function L(t,e){1&t&&(s.Vb(0,"th",34),s.Ec(1," Relevancy "),s.Ub())}function R(t,e){if(1&t&&(s.Vb(0,"td",36),s.Ec(1),s.Ub()),2&t){const t=e.$implicit;s.Cb(1),s.Gc(" ",t.match,"% ")}}function F(t,e){1&t&&(s.Vb(0,"th",34),s.Ec(1,"Name"),s.Ub())}function A(t,e){if(1&t&&(s.Vb(0,"td",35),s.Ec(1),s.Ub()),2&t){const t=e.$implicit;s.Cb(1),s.Fc(t.name)}}function T(t,e){1&t&&(s.Vb(0,"th",37),s.Ec(1,"Profile"),s.Ub())}const N=function(t){return["/","profile",t]};function G(t,e){if(1&t&&(s.Vb(0,"td",35),s.Vb(1,"button",38),s.Ec(2," PROFILE "),s.Ub(),s.Ub()),2&t){const t=e.$implicit;s.Eb(t.profile),s.Cb(1),s.mc("routerLink",s.pc(3,N,t.profile))}}function W(t,e){1&t&&(s.Vb(0,"th",37),s.Ec(1,"Resume"),s.Ub())}function Q(t,e){if(1&t&&(s.Vb(0,"td",35),s.Vb(1,"a",39),s.Vb(2,"button",40),s.Ec(3,"RESUME"),s.Ub(),s.Ub(),s.Ub()),2&t){const t=e.$implicit;s.Cb(1),s.nc("href",t.resume,s.yc)}}function z(t,e){1&t&&s.Qb(0,"th",37)}function B(t,e){if(1&t){const t=s.Wb();s.Vb(0,"td",35),s.Vb(1,"button",41),s.dc("click",(function(){s.wc(t);const n=e.$implicit;return s.hc().startInterview(n.interview)})),s.Ec(2," SHORTLIST "),s.Ub(),s.Ub()}if(2&t){const t=s.hc();s.Cb(1),s.mc("disabled",t.disabled)}}function $(t,e){1&t&&s.Qb(0,"tr",42)}function H(t,e){1&t&&s.Qb(0,"tr",43)}function K(t,e){1&t&&(s.Vb(0,"div",44),s.Vb(1,"div",45),s.Ec(2,"There are no applicants..."),s.Ub(),s.Ub())}const Y=function(t){return{"d-none":t}},X=function(){return[5,10,25,100]};let q=(()=>{class t{constructor(t,e){this.jobService=t,this.uiService=e,this.displayedColumns=["sl","name","match","resume","profile","interview"],this.applicants=[],this.disabled=!1,this.today=Date.now()}ngOnInit(){let t=0;if(this.job.rounds.forEach((e,n)=>{if(0===t&&new Date(e.date).getTime()>=this.today)return t++,this.interviewDate=e.date,this.round=n+1,this.applicants=this.job.applicants[this.round].applicants,!1}),this.applicants.length){const t=this.applicants.map((t,e)=>(console.log(t.applicant.username),console.log(t.applicant.profileName),console.log(t.jobMatch),console.log(t.applicant.resume),{sl:e+1,name:t.applicant.username||t.applicant.profileName,profile:t.applicant.profileName,match:t.jobMatch,resume:t.applicant.resume,interview:t}));this.dataSource=new D.k(t),this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort}}applyFilter(t){this.dataSource.filter=t.target.value.trim().toLowerCase(),this.dataSource.paginator&&this.dataSource.paginator.firstPage()}edit(){this.uiService.openAddJob({_id:this.job._id,designation:this.job.designation,description:this.job.description,skills:this.job.skills,"minimum experience":this.job.minimumExperience,"maximum experience":this.job.maximumExperience,"minimum salary":this.job.minimumSalary,"maximum salary":this.job.maximumSalary,location:this.job.location,total_rounds:this.job.totalRounds,rounds:this.job.rounds})}startInterview(t){this.uiService.startInterview(this.job,t,this.round)}}return t.\u0275fac=function(e){return new(e||t)(s.Pb(a.a),s.Pb(l.a))},t.\u0275cmp=s.Jb({type:t,selectors:[["app-employer-job-card"]],viewQuery:function(t,e){var n;1&t&&(s.Bc(O.a,!0),s.Bc(P.a,!0)),2&t&&(s.sc(n=s.ec())&&(e.paginator=n.first),s.sc(n=s.ec())&&(e.sort=n.first))},inputs:{job:"job"},decls:68,vars:32,consts:[[1,"mt-2","mb-2","mt-md-4","mb-md-4"],["matCardAvatar","","alt","KiddoHire",3,"src"],[1,"p-2","p-sm-3","p-md-4","m-0","d-flex"],[1,"panel__content"],[1,"m-2"],["color","primary","selected","",4,"ngFor","ngForOf"],[1,"job__description","p-1","p-sm-2","m-sm-2","border"],[1,"row","p-2","ml-1","m-sm-3"],[1,"col-*","mr-3"],[1,"text-muted"],[3,"expanded"],["color","warn","selected",""],[3,"ngClass"],["matInput","","placeholder","Any applicant credentials...",3,"keyup"],[1,"table_cover",3,"ngClass"],["matSort","",3,"dataSource"],["matColumnDef","sl"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","match"],["class","text-center","mat-cell","",4,"matCellDef"],["matColumnDef","name"],["matColumnDef","profile"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",3,"class",4,"matCellDef"],["matColumnDef","resume"],["matColumnDef","interview"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],[1,"row","justify-content-end",3,"ngClass"],[1,"col-*"],[3,"pageSizeOptions"],["class","row p-5 justify-content-center",4,"ngIf"],["color","primary","selected",""],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["mat-cell","",1,"text-center"],["mat-header-cell",""],["mat-raised-button","","color","accent",3,"routerLink"],["target","_blank",3,"href"],["mat-raised-button","","color","primary"],["mat-flat-button","","color","warn",3,"disabled","click"],["mat-header-row",""],["mat-row",""],[1,"row","p-5","justify-content-center"],[1,"col-*","text-muted"]],template:function(t,e){1&t&&(s.Vb(0,"mat-card",0),s.Vb(1,"mat-card-header"),s.Qb(2,"img",1),s.Vb(3,"mat-card-title"),s.Ec(4),s.ic(5,"titlecase"),s.Ub(),s.Ub(),s.Vb(6,"mat-card-content",2),s.Vb(7,"mat-accordion"),s.Vb(8,"mat-expansion-panel",3),s.Vb(9,"mat-expansion-panel-header"),s.Ec(10,"Job Details "),s.Ub(),s.Vb(11,"mat-chip-list",4),s.Dc(12,J,3,3,"mat-chip",5),s.Ub(),s.Vb(13,"div",6),s.Ec(14),s.ic(15,"titlecase"),s.Ub(),s.Vb(16,"div",7),s.Vb(17,"div",8),s.Vb(18,"span",9),s.Ec(19,"Location : "),s.Ub(),s.Ec(20),s.ic(21,"titlecase"),s.Ub(),s.Vb(22,"div",8),s.Vb(23,"span",9),s.Ec(24,"Experience Range : "),s.Ub(),s.Ec(25),s.Ub(),s.Vb(26,"div",8),s.Vb(27,"span",9),s.Ec(28,"Salary Range : "),s.Ub(),s.Ec(29),s.Ub(),s.Ub(),s.Ub(),s.Vb(30,"mat-expansion-panel",10),s.Vb(31,"mat-expansion-panel-header"),s.Ec(32,"Application Details"),s.Ub(),s.Vb(33,"p"),s.Ec(34," Interview scheduled on : "),s.Vb(35,"mat-chip",11),s.Ec(36),s.ic(37,"date"),s.Ub(),s.Ub(),s.Vb(38,"mat-form-field",12),s.Vb(39,"mat-label"),s.Ec(40,"Search applicant"),s.Ub(),s.Vb(41,"input",13),s.dc("keyup",(function(t){return e.applyFilter(t)})),s.Ub(),s.Ub(),s.Vb(42,"div",14),s.Vb(43,"mat-table",15),s.Tb(44,16),s.Dc(45,I,2,0,"th",17),s.Dc(46,M,2,1,"td",18),s.Sb(),s.Tb(47,19),s.Dc(48,L,2,0,"th",17),s.Dc(49,R,2,1,"td",20),s.Sb(),s.Tb(50,21),s.Dc(51,F,2,0,"th",17),s.Dc(52,A,2,1,"td",18),s.Sb(),s.Tb(53,22),s.Dc(54,T,2,0,"th",23),s.Dc(55,G,3,5,"td",24),s.Sb(),s.Tb(56,25),s.Dc(57,W,2,0,"th",23),s.Dc(58,Q,4,1,"td",18),s.Sb(),s.Tb(59,26),s.Dc(60,z,1,0,"th",23),s.Dc(61,B,3,1,"td",18),s.Sb(),s.Dc(62,$,1,0,"tr",27),s.Dc(63,H,1,0,"tr",28),s.Ub(),s.Ub(),s.Vb(64,"div",29),s.Vb(65,"div",30),s.Qb(66,"mat-paginator",31),s.Ub(),s.Ub(),s.Dc(67,K,3,0,"div",32),s.Ub(),s.Ub(),s.Ub(),s.Ub()),2&t&&(s.Cb(2),s.mc("src",e.job.postedBy.imageURL||"../../../../assets/images/jobs/company.png",s.yc),s.Cb(2),s.Fc(s.jc(5,17,e.job.designation)),s.Cb(8),s.mc("ngForOf",e.job.skills),s.Cb(2),s.Gc(" ",s.jc(15,19,e.job.description)," "),s.Cb(6),s.Gc("",s.jc(21,21,e.job.location)," "),s.Cb(5),s.Gc("",e.job.minimumExperience+" - "+e.job.maximumExperience," years "),s.Cb(4),s.Gc("",e.job.minimumSalary+" - "+e.job.maximumSalary," LPA "),s.Cb(1),s.mc("expanded",!!e.applicants.length),s.Cb(6),s.Fc(s.jc(37,23,e.interviewDate)),s.Cb(2),s.mc("ngClass",s.pc(25,Y,!e.applicants.length)),s.Cb(4),s.mc("ngClass",s.pc(27,Y,!e.applicants.length)),s.Cb(1),s.mc("dataSource",e.dataSource),s.Cb(19),s.mc("matHeaderRowDef",e.displayedColumns),s.Cb(1),s.mc("matRowDefColumns",e.displayedColumns),s.Cb(1),s.mc("ngClass",s.pc(29,Y,!e.applicants.length)),s.Cb(2),s.mc("pageSizeOptions",s.oc(31,X)),s.Cb(1),s.mc("ngIf",!e.applicants.length))},directives:[S.a,S.e,S.c,S.i,S.d,_.a,_.c,_.d,k.b,h.k,k.a,p.c,h.j,p.g,m.b,D.j,P.a,D.c,D.e,D.b,D.g,D.i,O.a,h.l,D.d,P.b,D.a,f.a,i.c,D.f,D.h],pipes:[h.t,h.e],styles:["mat-card[_ngcontent-%COMP%]{width:100vw;min-width:250px;max-width:1000px}.panel__content[_ngcontent-%COMP%]{position:relative}.edit[_ngcontent-%COMP%]{position:absolute;top:10px;right:10px}mat-accordion[_ngcontent-%COMP%]{width:100%}mat-expansion-panel[_ngcontent-%COMP%]{width:100%;max-width:87vw}img[matCardAvatar][_ngcontent-%COMP%]{border-radius:0!important}.job__description[_ngcontent-%COMP%]{height:180px;overflow-y:scroll;border-radius:5px;box-shadow:1px 0 2px silver}.table_cover[_ngcontent-%COMP%]{width:100%;overflow-x:scroll;overflow-y:hidden}mat-table[_ngcontent-%COMP%]{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;min-width:500px;max-width:inherit;margin:auto}.mat-form-field[_ngcontent-%COMP%]{font-size:14px;width:100%}td[_ngcontent-%COMP%], th[_ngcontent-%COMP%]{width:200px!important}.text-center[_ngcontent-%COMP%], th[_ngcontent-%COMP%]{text-align:center}.text-success[_ngcontent-%COMP%]{color:green;background-color:#fff}.text-danger[_ngcontent-%COMP%]{color:red;background-color:#fff}a[_ngcontent-%COMP%]{text-decoration:none;color:#fff}"]}),t})();var Z=n("Aso2");function tt(t,e){if(1&t&&(s.Vb(0,"mat-chip",20),s.Ec(1),s.ic(2,"titlecase"),s.Ub()),2&t){const t=e.$implicit;s.Cb(1),s.Fc(s.jc(2,1,t))}}function et(t,e){if(1&t){const t=s.Wb();s.Vb(0,"button",21),s.dc("click",(function(){s.wc(t);const e=s.hc();return e.applyJob(e.job._id)})),s.Ec(1," APPLY "),s.Ub()}}function nt(t,e){if(1&t){const t=s.Wb();s.Vb(0,"button",21),s.dc("click",(function(){s.wc(t);const e=s.hc();return e.generateReport(e.job._id)})),s.Ec(1," COMPARE "),s.Ub()}}function it(t,e){1&t&&(s.Vb(0,"span"),s.Ec(1,"Preliminary Round"),s.Ub())}function ot(t,e){1&t&&(s.Vb(0,"span"),s.Ec(1,"First Round"),s.Ub())}function ct(t,e){1&t&&(s.Vb(0,"span"),s.Ec(1,"Second Round"),s.Ub())}function st(t,e){1&t&&(s.Vb(0,"span"),s.Ec(1,"Third Round"),s.Ub())}function at(t,e){1&t&&(s.Vb(0,"span"),s.Ec(1,"Fourth Round"),s.Ub())}function rt(t,e){1&t&&(s.Vb(0,"span"),s.Ec(1,"Fifth Round"),s.Ub())}function bt(t,e){1&t&&(s.Vb(0,"span"),s.Ec(1,"Sixth Round"),s.Ub())}function lt(t,e){if(1&t&&(s.Vb(0,"mat-chip",25),s.Dc(1,it,2,0,"span",26),s.Dc(2,ot,2,0,"span",26),s.Dc(3,ct,2,0,"span",26),s.Dc(4,st,2,0,"span",26),s.Dc(5,at,2,0,"span",26),s.Dc(6,rt,2,0,"span",26),s.Dc(7,bt,2,0,"span",26),s.Ub()),2&t){const t=e.$implicit;s.Cb(1),s.mc("ngIf","0"===t.round),s.Cb(1),s.mc("ngIf","1"===t.round),s.Cb(1),s.mc("ngIf","2"===t.round),s.Cb(1),s.mc("ngIf","3"===t.round),s.Cb(1),s.mc("ngIf","4"===t.round),s.Cb(1),s.mc("ngIf","5"===t.round),s.Cb(1),s.mc("ngIf","6"===t.round)}}function dt(t,e){if(1&t&&(s.Vb(0,"mat-chip",27),s.Ec(1),s.ic(2,"date"),s.Ub()),2&t){const t=s.hc(2);s.Cb(1),s.Fc(s.jc(2,1,t.currentRound))}}function pt(t,e){if(1&t&&(s.Vb(0,"div",22),s.Dc(1,lt,8,7,"mat-chip",23),s.Dc(2,dt,3,3,"mat-chip",24),s.Ub()),2&t){const t=s.hc();s.Cb(1),s.mc("ngForOf",t.status),s.Cb(1),s.mc("ngIf",t.status.length&&t.status[t.status.length-1].cleared&&t.currentRound)}}function mt(t,e){1&t&&(s.Vb(0,"div",28),s.Vb(1,"button",29),s.Ec(2," ACCEPT OFFER "),s.Ub(),s.Ub())}function ut(t,e){1&t&&(s.Vb(0,"div",28),s.Vb(1,"mat-chip",30),s.Ec(2," Sorry, You are not selected"),s.Ub(),s.Ub())}function ht(t,e){if(1&t){const t=s.Wb();s.Vb(0,"button",31),s.dc("click",(function(){s.wc(t);const e=s.hc();return e.applyJob(e.job._id)})),s.Ec(1," APPLY "),s.Ub()}}function ft(t,e){if(1&t){const t=s.Wb();s.Vb(0,"button",31),s.dc("click",(function(){s.wc(t);const e=s.hc();return e.generateReport(e.job._id)})),s.Ec(1," COMPARE "),s.Ub()}}const gt=function(t){return["/","profile",t]};let Ct=(()=>{class t{constructor(t,e){this.jobService=t,this.profileService=e,this.jobs=new s.o,this.date=Date.now(),this.status=[],this.selected=void 0}ngOnInit(){this.appliedJob&&(console.log(this.job),this.profileService.fetchProfile(this.profileName).subscribe(t=>{var e;this.user=t.user,console.log(this.user),this.user.applications.forEach(t=>{t.job!==this.job._id||(this.status=t.status)}),this.currentRound=null===(e=this.job.rounds[this.status.length-1])||void 0===e?void 0:e.date,this.job.shortlisted.forEach(t=>{t.applicant===this.user._id&&(this.selected=!0)}),this.status.forEach(t=>{t.cleared||(this.selected=!1)})}))}applyJob(t){console.log(t),this.jobService.applyJob(t)}generateReport(t){this.jobService.generateReport(t,this.status.length-1)}}return t.\u0275fac=function(e){return new(e||t)(s.Pb(a.a),s.Pb(Z.a))},t.\u0275cmp=s.Jb({type:t,selectors:[["app-employee-job-card"]],inputs:{job:"job",profileName:"profileName",appliedJob:"appliedJob"},outputs:{jobs:"jobs"},decls:50,vars:30,consts:[[1,"m-2","m-md-4"],["matCardAvatar","","alt","KiddoHire",3,"src"],[1,"text-dark"],[1,"d-flex","flex-wrap"],[1,"mb-1","ml-1","mr-1","pl-1","pr-1"],["color","primary","selected","",4,"ngFor","ngForOf"],[1,"row","justify-content-between","pt-0","pb-3","pl-2","pr-2","m-0","d-flex"],[1,"col-12","col-sm-8","job__description","p-1","p-sm-2","m-sm-2","border"],[1,"col-sm-3","job_poster","d-none","d-sm-flex","flex-column","justify-content-center","align-items-stretch"],["mat-raised-button","","color","accent",1,"mb-2",3,"routerLink"],["class","mb-2","mat-raised-button","","color","primary",3,"click",4,"ngIf"],[1,"row","p-2","ml-1","m-sm-3"],[1,"col-*","mr-3"],[1,"text-muted"],["class","row pl-4 mt-2 mb-2",4,"ngIf"],[1,"row","mt-2","mb-2","justify-content-center"],["class","col-*",4,"ngIf"],[1,"p-0","d-flex","justify-content-around","justify-content-md-center","d-sm-none"],["mat-raised-button","","color","accent",1,"ml-3",3,"routerLink"],["class","mr-3","mat-raised-button","","color","primary",3,"click",4,"ngIf"],["color","primary","selected",""],["mat-raised-button","","color","primary",1,"mb-2",3,"click"],[1,"row","pl-4","mt-2","mb-2"],["class","m-1 bg-success text-light","selected","",4,"ngFor","ngForOf"],["class","bg-warning m-1","selected","",4,"ngIf"],["selected","",1,"m-1","bg-success","text-light"],[4,"ngIf"],["selected","",1,"bg-warning","m-1"],[1,"col-*"],["mat-raised-button","",1,"bg-success","text-light"],["color","warn","selected","",1,"pl-4","pr-4"],["mat-raised-button","","color","primary",1,"mr-3",3,"click"]],template:function(t,e){1&t&&(s.Vb(0,"mat-card",0),s.Vb(1,"mat-card-header"),s.Qb(2,"img",1),s.Vb(3,"mat-card-title"),s.Ec(4),s.ic(5,"titlecase"),s.Ub(),s.Vb(6,"mat-card-subtitle"),s.Ec(7,"at "),s.Vb(8,"span",2),s.Ec(9),s.ic(10,"titlecase"),s.Ub(),s.Ub(),s.Vb(11,"mat-card-subtitle",3),s.Vb(12,"li",4),s.Ec(13),s.Ub(),s.Ub(),s.Vb(14,"mat-card-subtitle"),s.Vb(15,"mat-chip-list"),s.Dc(16,tt,3,3,"mat-chip",5),s.Ub(),s.Ub(),s.Ub(),s.Vb(17,"mat-card-content",6),s.Vb(18,"div",7),s.Ec(19),s.ic(20,"titlecase"),s.Ub(),s.Vb(21,"div",8),s.Vb(22,"button",9),s.Ec(23," PROFILE "),s.Ub(),s.Dc(24,et,2,0,"button",10),s.Dc(25,nt,2,0,"button",10),s.Ub(),s.Ub(),s.Vb(26,"div",11),s.Vb(27,"div",12),s.Vb(28,"span",13),s.Ec(29,"Location : "),s.Ub(),s.Ec(30),s.ic(31,"titlecase"),s.Ub(),s.Vb(32,"div",12),s.Vb(33,"span",13),s.Ec(34,"Experience : "),s.Ub(),s.Ec(35),s.Ub(),s.Vb(36,"div",12),s.Vb(37,"span",13),s.Ec(38,"Salary : "),s.Ub(),s.Ec(39),s.Ub(),s.Ub(),s.Dc(40,pt,3,2,"div",14),s.Vb(41,"div",15),s.Dc(42,mt,3,0,"div",16),s.Ub(),s.Vb(43,"div",15),s.Dc(44,ut,3,0,"div",16),s.Ub(),s.Vb(45,"mat-card-actions",17),s.Vb(46,"button",18),s.Ec(47," PROFILE "),s.Ub(),s.Dc(48,ht,2,0,"button",19),s.Dc(49,ft,2,0,"button",19),s.Ub(),s.Ub()),2&t&&(s.Cb(2),s.mc("src",e.job.postedBy.imageURL||"../../../../assets/images/jobs/company.png",s.yc),s.Cb(2),s.Fc(s.jc(5,18,e.job.designation)),s.Cb(5),s.Gc("",s.jc(10,20,e.job.postedBy.username)," "),s.Cb(4),s.Gc(" ",e.job.postedBy.employees," employees "),s.Cb(3),s.mc("ngForOf",e.job.skills),s.Cb(3),s.Gc(" ",s.jc(20,22,e.job.description)," "),s.Cb(3),s.mc("routerLink",s.pc(26,gt,e.job.postedBy.profileName)),s.Cb(2),s.mc("ngIf",!e.appliedJob),s.Cb(1),s.mc("ngIf",e.appliedJob),s.Cb(5),s.Gc("",s.jc(31,24,e.job.location)," "),s.Cb(5),s.Gc("",e.job.minimumExperience+" - "+e.job.maximumExperience," years "),s.Cb(4),s.Gc("",e.job.minimumSalary+" - "+e.job.maximumSalary," LPA "),s.Cb(1),s.mc("ngIf",e.currentRound&&e.appliedJob&&void 0===e.selected),s.Cb(2),s.mc("ngIf",e.appliedJob&&!0===e.selected),s.Cb(2),s.mc("ngIf",e.appliedJob&&!1===e.selected),s.Cb(2),s.mc("routerLink",s.pc(28,gt,e.job.postedBy.profileName)),s.Cb(2),s.mc("ngIf",!e.appliedJob),s.Cb(1),s.mc("ngIf",e.appliedJob))},directives:[S.a,S.e,S.c,S.i,S.h,k.b,h.k,S.d,f.a,i.c,h.l,S.b,k.a],pipes:[h.t,h.e],styles:["mat-card[_ngcontent-%COMP%]{min-width:250px;width:90vw;max-width:1000px;font-size:14px}mat-card-subtitle[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{cursor:pointer}mat-card-subtitle[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:12px}img[matCardAvatar][_ngcontent-%COMP%]{width:70px!important;height:70px!important;border-radius:0!important}.job__description[_ngcontent-%COMP%]{height:150px;overflow-y:scroll;border-radius:10px;box-shadow:1px 1px 2px silver}img[mat-card-md-image][_ngcontent-%COMP%]{border-radius:125px}.strike[_ngcontent-%COMP%]{text-decoration:line-through}button[_ngcontent-%COMP%]{max-width:150px}"]}),t})();function jt(t,e){1&t&&(s.Vb(0,"section",6),s.Vb(1,"div",7),s.Qb(2,"mat-spinner"),s.Ub(),s.Ub())}function wt(t,e){if(1&t&&(s.Vb(0,"div",10),s.Qb(1,"app-employer-job-card",11),s.Ub()),2&t){const t=e.$implicit;s.Cb(1),s.mc("job",t)}}function Ut(t,e){if(1&t&&(s.Vb(0,"div",8),s.Dc(1,wt,2,1,"div",9),s.Ub()),2&t){const t=s.hc();s.Cb(1),s.mc("ngForOf",t.jobs)}}function vt(t,e){if(1&t&&(s.Vb(0,"div",10),s.Qb(1,"app-employee-job-card",12),s.Ub()),2&t){const t=e.$implicit,n=s.hc(2);s.Cb(1),s.mc("job",t)("appliedJob",n.appliedJob)("profileName",n.user.profileName)}}function Vt(t,e){if(1&t&&(s.Vb(0,"div",8),s.Dc(1,vt,2,3,"div",9),s.Ub()),2&t){const t=s.hc();s.Cb(1),s.mc("ngForOf",t.jobs)}}function xt(t,e){1&t&&(s.Vb(0,"div",13),s.Vb(1,"div",14),s.Ec(2,"No jobs found..."),s.Ub(),s.Ub())}let yt=(()=>{class t{constructor(t){this.jobService=t,this.jobs=[],this.appliedJob=!1}ngOnInit(){this.jobService.jobsSubj.subscribe(t=>{this.isLoading=!1})}getIsLoading(t){this.isLoading=t}getJobType(t){this.appliedJob=t}}return t.\u0275fac=function(e){return new(e||t)(s.Pb(a.a))},t.\u0275cmp=s.Jb({type:t,selectors:[["app-jobs-list"]],inputs:{jobs:"jobs",user:"user",isLoading:"isLoading",error:"error"},decls:7,vars:5,consts:[[1,"content"],[1,"row","m-0"],[1,"col-12",3,"user","isLoading","appliedJob"],["class","row justify-content-center align-items-center",4,"ngIf"],["class","row justify-content-center",4,"ngIf"],["class","row justify-content-center mt-5",4,"ngIf"],[1,"row","justify-content-center","align-items-center"],[1,"col-*","m-3","m--md-5"],[1,"row","justify-content-center"],["class","col-*",4,"ngFor","ngForOf"],[1,"col-*"],[3,"job"],[3,"job","appliedJob","profileName"],[1,"row","justify-content-center","mt-5"],[1,"col-*","text-muted","pt-5"]],template:function(t,e){1&t&&(s.Vb(0,"main",0),s.Vb(1,"section",1),s.Vb(2,"app-search",2),s.dc("isLoading",(function(t){return e.getIsLoading(t)}))("appliedJob",(function(t){return e.getJobType(t)})),s.Ub(),s.Ub(),s.Dc(3,jt,3,0,"section",3),s.Dc(4,Ut,2,1,"div",4),s.Dc(5,Vt,2,1,"div",4),s.Dc(6,xt,3,0,"div",5),s.Ub()),2&t&&(s.Cb(2),s.mc("user",e.user),s.Cb(1),s.mc("ngIf",e.isLoading),s.Cb(1),s.mc("ngIf",!e.isLoading&&e.user&&"hr"===e.user.role),s.Cb(1),s.mc("ngIf",!e.isLoading&&e.user&&"developer"===e.user.role),s.Cb(1),s.mc("ngIf",!e.isLoading&&!e.error&&e.user&&!e.jobs.length))},directives:[y,h.l,E.b,h.k,q,Ct],styles:[".content[_ngcontent-%COMP%]{position:relative}.center[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}"]}),t})();function Et(t,e){if(1&t){const t=s.Wb();s.Vb(0,"section",4),s.Vb(1,"div",5),s.Ec(2,"Something went wrong"),s.Ub(),s.Vb(3,"button",6),s.dc("click",(function(){return s.wc(t),s.hc().ngOnInit()})),s.Vb(4,"mat-icon"),s.Ec(5,"replay"),s.Ub(),s.Ub(),s.Ub()}}let Ot=(()=>{class t{constructor(t,e){this.jobService=t,this.authService=e,this.jobs=[],this.isLoading=!0,this.error=!1}ngOnInit(){this.jobService.fetchJobs(),this.jobService.jobsSubj.subscribe(t=>{this.jobs=t,this.isLoading=!1,this.error=!1},t=>{console.log("fetch error"),this.isLoading=!1,this.error=!0}),this.authService.userSub.subscribe(t=>{this.user=t})}}return t.\u0275fac=function(e){return new(e||t)(s.Pb(a.a),s.Pb(r.a))},t.\u0275cmp=s.Jb({type:t,selectors:[["app-jobs"]],decls:6,vars:5,consts:[[1,"row","col-12","m-0","p-0","d-block"],[1,"p-3","pb-5","p-md-5","m-0"],[1,"col-auto","m-0","p-0",3,"isLoading","error","user","jobs"],["class","row flex-column retry justify-content-center align-items-center",4,"ngIf"],[1,"row","flex-column","retry","justify-content-center","align-items-center"],[1,"col-*","text-muted"],["mat-mini-fab","",1,"bg-light",3,"click"]],template:function(t,e){1&t&&(s.Vb(0,"main"),s.Vb(1,"section",0),s.Qb(2,"app-header"),s.Ub(),s.Vb(3,"section",1),s.Qb(4,"app-jobs-list",2),s.Ub(),s.Dc(5,Et,6,0,"section",3),s.Ub()),2&t&&(s.Cb(4),s.mc("isLoading",e.isLoading)("error",e.error)("user",e.user)("jobs",e.jobs),s.Cb(1),s.mc("ngIf",e.error&&!e.isLoading))},directives:[b.a,yt,h.l,f.a,C.a],styles:["section[_ngcontent-%COMP%]{width:100%;position:relative}main[_ngcontent-%COMP%]{background-image:radial-gradient(rgba(7,56,155,0),rgba(7,57,156,.2));height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;min-height:100%}.retry[_ngcontent-%COMP%]{position:absolute;top:50vh;left:50vw;transform:translate(-50%,-50%)}"]}),t})();var Pt=n("FKr1");const Dt=[{path:"",component:Ot}];let St=(()=>{class t{}return t.\u0275mod=s.Nb({type:t}),t.\u0275inj=s.Mb({factory:function(e){return new(e||t)},providers:[{provide:Pt.f,useValue:"en-GB"}],imports:[[o.a,i.e.forChild(Dt),c.a]]}),t})()}}]);