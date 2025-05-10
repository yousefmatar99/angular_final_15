import { Component, Input } from '@angular/core';
import { Package } from 'src/app/models/package.model';
import { Question } from 'src/app/models/question.model';
import { PackageService } from 'src/app/services/package.service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent {
  @Input() packages: Package[] = [];
  @Input() partnerId: string = '';

  editingQuestion: Question | null = null;
  newQuestionMap: { [pkgId: string]: Question } = {};
  showQuestionForm: { [pkgId: string]: boolean } = {};

  constructor(private packageService: PackageService) {}

  private resetNewQuestion(): Question {
    return new Question(null, '', 0, '', false);
  }

  getNewQuestion(pkg: Package): Question {
    if (!this.newQuestionMap[pkg.id]) {
      this.newQuestionMap[pkg.id] = this.resetNewQuestion();
    }
    return this.newQuestionMap[pkg.id];
  }

  onShowAddQuestionForm(pkg: Package): void {
    this.newQuestionMap[pkg.id] = this.resetNewQuestion();
    this.showQuestionForm[pkg.id] = true;
  }

  onSaveNewQuestion(pkg: Package): void {
    const newQ = this.getNewQuestion(pkg);
    if (!newQ.text.trim()) return;
    const appended = Question.fromJson(newQ.toJson());
    pkg.questions = [...pkg.questions, appended];
    this.packageService
      .updateQuestions(this.partnerId, pkg.id, pkg.questions)
      .subscribe(() => {
        this.showQuestionForm[pkg.id] = false;
        this.newQuestionMap[pkg.id] = this.resetNewQuestion();
      });
  }

  onShowEditQuestionForm(q: Question): void {
    this.editingQuestion = Question.fromJson(q);
  }

  onSaveEditedQuestion(pkg: Package): void {
    if (!this.editingQuestion) return;
    pkg.questions = pkg.questions.map(q =>
      q.id === this.editingQuestion!.id ? this.editingQuestion! : q
    );
    this.packageService
      .updateQuestions(this.partnerId, pkg.id, pkg.questions)
      .subscribe(() => (this.editingQuestion = null));
  }

  onDeleteQuestion(pkg: Package, questionId: string | null): void {
    pkg.questions = pkg.questions.filter(q => q.id !== questionId);
    this.packageService.updateQuestions(this.partnerId, pkg.id, pkg.questions);
  }

  deletePackage(pkgId: string): void {
    this.packageService.deletePkg(pkgId, this.partnerId);
  }
}
